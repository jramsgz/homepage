import { getClientIp } from "@supercharge/request-ip";

import { getSettings } from "utils/config/config";

const ipaddr = require("ipaddr.js");

function checkSingleIPRange(ip, cidr) {
  try {
    const ipAddr = ipaddr.process(ip);
    // If the CIDR is not in the format of x.x.x.x/y, we assume it is a single IP
    if (!cidr.includes("/")) {
      const cidrIP = ipaddr.process(cidr);
      // If both are IPv6, we need to normalize the strings
      if (ipAddr.kind() === "ipv6" && cidrIP.kind() === "ipv6") {
        return (ipAddr.toNormalizedString() === cidrIP.toNormalizedString());
      }
      return ipAddr.toString() === cidrIP.toString();
    }
    // Otherwise, we assume it is a CIDR range
    const range = ipaddr.parseCIDR(cidr);
    return ipAddr.match(range);
  } catch (e) {
    return false;
  }
}

function checkIPRange(ip, range) {
  if (typeof range === "string") {
    return checkSingleIPRange(ip, range);
  }
  if (Array.isArray(range)) {
    return range.find((cidr) => checkSingleIPRange(ip, cidr)) !== undefined;
  }
  return false;
}

export function isRequestProxied(remoteAddress) {
  const settings = getSettings();
  // Check if trustedproxies is set
  const trustedProxies = settings?.trustedproxies;

  // If trustedproxies is set, check if the client IP
  // is in the trustedproxies address space.
  return trustedProxies ? checkIPRange(remoteAddress, trustedProxies) : false;
}

export function getRealClientIP(req) {
  const {remoteAddress} = req.socket;
  const proxied = isRequestProxied(remoteAddress);
  
  // If request is proxied we can trust headers, otherwise we return the socket IP
  return proxied ? getClientIp(req) || remoteAddress : remoteAddress;
}

export function isInLocalScope(req) {
  const settings = getSettings();
  // Check if localscope is set
  const localScope = settings?.localscope;

  // If localscope is set, check if the client IP
  // is in the localscope address space.
  if (localScope) {
    const ip = getRealClientIP(req);
    return checkIPRange(ip, localScope);
  }
  return false;
}

export function bookmarksFilterer(bookmarks) {
  const filteredBookmarks = [];
  bookmarks.forEach((group) => {
    const filteredGroup = {
      ...group,
      bookmarks: [],
    };
    group.bookmarks.forEach((bookmark) => {
      if (!bookmark.local) {
        filteredGroup.bookmarks.push(bookmark);
      }
    });
    if (filteredGroup.bookmarks.length > 0) {
      filteredBookmarks.push(filteredGroup);
    }
  });

  return filteredBookmarks;
}

export function servicesFilterer(services) {
  const filteredServices = [];
  services.forEach((group) => {
    const filteredGroup = {
      ...group,
      services: [],
    };
    group.services.forEach((service) => {
      // When not in a local scope we always strip server, container and widget properties
      // eslint-disable-next-line no-param-reassign
      delete service.server;
      // eslint-disable-next-line no-param-reassign
      delete service.container;
      // eslint-disable-next-line no-param-reassign
      delete service.widget;
      if (!service.local) {
        filteredGroup.services.push(service);
      }
    });
    if (filteredGroup.services.length > 0) {
      filteredServices.push(filteredGroup);
    }
  });

  return filteredServices;
}

export function widgetsFilterer(widgets) {
  const filteredWidgets = [];
  widgets.forEach((widget) => {
    if (!widget.options.local) {
      filteredWidgets.push(widget);
    }
  });

  return filteredWidgets;
}
