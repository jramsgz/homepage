---
title: NetAlertX
description: NetAlertX (formerly PiAlert) Widget Configuration
---

Learn more about [NetAlertX](https://github.com/jokob-sk/NetAlertX).

_Note that the project was renamed from PiAlert to NetAlertX._

Allowed fields: `["total", "connected", "new_devices", "down_alerts"]`.

<<<<<<< HEAD
=======
If you have enabled a password on your NetAlertX instance, you will need to provide the `SYNC_api_token` as the `key` in your config.

>>>>>>> 2245cdda55bb775cc880d50d543dac87fdffbd85
```yaml
widget:
  type: netalertx
  url: http://ip:port
<<<<<<< HEAD
=======
  key: netalertxsyncapitoken # optional, only if password is enabled
>>>>>>> 2245cdda55bb775cc880d50d543dac87fdffbd85
```
