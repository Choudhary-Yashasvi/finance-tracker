# Deploying the Frontend to GitHub Pages

This repository includes a GitHub Actions workflow that builds the React `client` and publishes the built `dist` folder to the `gh-pages` branch so GitHub Pages can serve the site.

How it works
- The workflow `/.github/workflows/deploy-client.yml` runs on push to `main` (and can be triggered manually).
- It installs dependencies, runs `npm run build` in the `client` folder, and publishes `client/dist` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

Steps you should take on GitHub after the workflow runs at least once:
1. Go to your repository on GitHub → `Settings` → `Pages` (left sidebar).
2. Under "Build and deployment", select:
   - Source: `gh-pages` branch
   - Folder: `/ (root)`
3. Save — GitHub Pages will provide a URL like `https://<username>.github.io/<repo>/`.

Notes
- The workflow uses the automatically provided `GITHUB_TOKEN` so you do not need to add deploy tokens.
- If you want to trigger a manual deployment, go to the `Actions` tab → pick `Deploy Client to GitHub Pages` → `Run workflow`.
- Ensure `client/package.json` has a `build` script (Vite: `vite build`) — the project already includes this.

After you have the Pages URL, add it to `README.md` so visitors can click the live demo link.
