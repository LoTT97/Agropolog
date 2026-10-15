# Agropolog

Website for Agropolog, a farm-to-table restaurant. It's a static site (HTML, CSS and vanilla JS) with no build step.

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Editing content

- **Menu:** edit the `MENU` object at the top of `script.js`.
- **Hours, address, contact info:** edit `index.html`.

All content is placeholder data for now.

## Deployment

Every push to `main` deploys the site to http://dolosia.com through GitHub Actions (`.github/workflows/deploy.yml`).
The workflow sends the files over SSH with a deploy key that can only run `deploy/agropolog-deploy.sh` on the server.
One-time server setup: `sh deploy/setup-auto-deploy.sh`.
