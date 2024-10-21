---
title: Immich
description: Immich Widget Configuration
---

Learn more about [Immich](https://github.com/immich-app/immich).

<<<<<<< HEAD
=======
| Immich Version | Homepage Widget Version |
| -------------- | ----------------------- |
| < v1.118       | 1 (default)             |
| >= v1.118      | 2                       |

>>>>>>> 2245cdda55bb775cc880d50d543dac87fdffbd85
Find your API key under `Account Settings > API Keys`.

Allowed fields: `["users" ,"photos", "videos", "storage"]`.

Note that API key must be from admin user.

```yaml
widget:
  type: immich
  url: http://immich.host.or.ip
  key: adminapikeyadminapikeyadminapikey
  version: 2 # optional, default is 1
```
