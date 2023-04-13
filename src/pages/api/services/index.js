import { servicesResponse } from "utils/config/api-response";
import { isInLocalScope, servicesFilterer } from "utils/config/scope";

export default async function handler(req, res) {
  const services = await servicesResponse();
  if (!isInLocalScope(req)) {
    res.send(servicesFilterer(services));
  } else {
    res.send(services);
  }
}
