# Put the services page online (Netlify or Cloudflare Pages)

The `services` folder is self-contained: everything the page needs is inside it.
Fill in your WhatsApp number and email in `services/script.js` **before** you deploy.

## Option A: Cloudflare Pages (recommended, updates itself)
Free. Every time you push to GitHub, the live page updates by itself.
1. Sign up at **pages.cloudflare.com** (free).
2. **Workers & Pages → Create application → Pages → Connect to Git**.
   GitHub asks you to install the Cloudflare app: choose **Only select repositories** → `laylen-hub`.
   Then pick the `laylen-hub` repository. (If the buttons are named a bit differently, look for "Pages" and "Connect to Git".)
3. Settings:
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: **`services`**
4. Press **Save and Deploy**. Your page is at `https://<name>.pages.dev`.
   You can pick the name, for example `laylen-studio.pages.dev`.

## Option B: Netlify Drop (fastest, no Git needed)
1. Download the `services` folder to your computer.
2. Go to **app.netlify.com/drop** and drag the whole `services` folder onto the page.
3. Sign up when it asks you to (free), so the site doesn't disappear.
4. **Site configuration → Change site name** → for example `laylen-studio`.
   Your page is at `https://laylen-studio.netlify.app`.
   To update it later, drag the folder in again under **Deploys**.

## After it's live
- Open the link on your phone and tap **WhatsApp me**. Check that the message arrives on your WhatsApp.
- Make sure the yellow "Setup needed" bar is **gone**. If you still see it, the number in `script.js` isn't filled in correctly.
- Put the link in your WhatsApp Business profile, Instagram bio and LinkedIn.
- Optional: buy a domain (for example `laylen.my`, about RM60–RM100 a year) and connect it in Cloudflare/Netlify settings.

Use the same way to host your **clients'** websites: one Cloudflare Pages or Netlify site per client.
