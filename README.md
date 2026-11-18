# study-hub

Laylen's UTAR DY Study Hub. It is a web app you can install on a phone (PWA).

## Install as an app
- **Android / Chrome / Edge**: open the site and tap **📲 Install App** (or use the browser menu, then "Install app").
- **iPhone / iPad**: open the site in Safari, tap Share, then **Add to Home Screen**.

After you install it, the app opens full-screen with its own icon and works offline.
Files, notes and tasks are saved in that device's browser, so use **⇩ Backup** to keep a copy.

When you change app files, bump `CACHE_VERSION` in `sw.js` so installed copies update.

## Earn money: services page
`services/index.html` is a freelance page for selling websites and dashboards to small businesses (prices in RM, WhatsApp quote form).
Put your WhatsApp number and email at the top of `services/script.js`, then follow `services/GET-CLIENTS.md`.
