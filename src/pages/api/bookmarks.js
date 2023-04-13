import { bookmarksResponse } from "utils/config/api-response";
import { isInLocalScope, bookmarksFilterer } from "utils/config/scope";

export default async function handler(req, res) {
  const bookmarksArray = await bookmarksResponse();
  if (!isInLocalScope(req)) {
    res.send(bookmarksFilterer(bookmarksArray));
  } else {
    res.send(bookmarksArray);
  }
}
