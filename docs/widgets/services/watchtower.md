---
title: Watchtower
description: Watchtower Widget Configuration
---

Learn more about [Watchtower](https://github.com/containrrr/watchtower).

<<<<<<< HEAD
To use this widget, Watchtower needs to be configured to to [enable metrics](https://containrrr.dev/watchtower/metrics/).
=======
To use this widget, Watchtower needs to be configured to [enable metrics](https://containrrr.dev/watchtower/metrics/).
>>>>>>> 2245cdda55bb775cc880d50d543dac87fdffbd85

Allowed fields: `["containers_scanned", "containers_updated", "containers_failed"]`.

```yaml
widget:
  type: watchtower
  url: http://your-ip-address:8080
  key: demotoken
```
