import { widgetsResponse } from "utils/config/api-response";
import { isInLocalScope, widgetsFilterer } from "utils/config/scope";

export default async function handler(req, res) {
  const widgets = await widgetsResponse();
  if (!isInLocalScope(req)) {
    res.send(widgetsFilterer(widgets));
  } else {
    res.send(widgets);
  }
}
