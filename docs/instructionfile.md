# Faisla: Build and Deployment Instructions

This guide explains how to install, run, build, and optionally deploy Faisla. The React application is inside the nested `faisla-game` folder. Run its npm commands from that folder, not from the repository root.

## 1. Prerequisites

- Install **Node.js 22.12 or later** (Node.js 22 LTS is recommended). npm is included with Node.js.
- Use PowerShell, Windows Terminal, or the VS Code integrated terminal.
- For deployment, you also need access to the GitHub repository and permission to publish its GitHub Pages site.

Check that Node.js and npm are available:

```powershell
node --version
npm --version
```

## 2. Open the application folder

In the terminal, change to the React app directory:

```powershell
cd C:\Users\vathu\Downloads\prep\faisla-game\faisla-game
```

If the project is in a different location, replace the path above with the path to its inner `faisla-game` folder—the one containing `package.json`.

You can confirm that you are in the correct folder with:

```powershell
Get-ChildItem package.json
```

## 3. Install dependencies

Install the exact dependency versions recorded in the lockfile:

```powershell
npm ci
```

Run this once after cloning or downloading the project, and again if the dependencies change. If `npm ci` reports that the lockfile is out of sync with `package.json`, use `npm install` to update/install dependencies.

## 4. Run the application locally

Start Vite's development server:

```powershell
npm run dev
```

Keep this terminal open while using the app. Open the local address printed in the terminal; it is usually:

```text
http://localhost:5173/
```

Vite reloads the page as you change source files. To stop the server, focus the terminal and press **Ctrl+C**.

### Optional: test on a phone on the same Wi-Fi

Start Vite so other devices on your local network can reach it:

```powershell
npm run dev -- --host 0.0.0.0
```

Open the **Network** URL Vite prints on the phone. The computer and phone must be on the same network; allow the connection through Windows Firewall if prompted.

## 5. Create a production build

Stop the development server with **Ctrl+C**, then run:

```powershell
npm run build
```

Vite writes the production-ready static files to the app's `dist` folder. A successful build ends without errors. The production configuration uses `/faisla-game/` as its base path for GitHub Pages.

## 6. Preview the production build locally

After building, start Vite's preview server:

```powershell
npm run preview
```

Open the local URL printed in the terminal, usually `http://localhost:4173/`. Keep the terminal open while testing and press **Ctrl+C** to stop the server.

Use the preview server to check the built version; the development server and production preview are separate.

## 7. Deploy to GitHub Pages (optional)

The project includes a deploy script that builds the app and publishes `dist` to the `gh-pages` branch. Before deploying:

1. Make sure your changes are committed and pushed to the repository's `main` branch.
2. From the app directory, install dependencies if you have not already:

   ```powershell
   npm ci
   ```

3. Run the deployment script:

   ```powershell
   npm run deploy
   ```

4. In the GitHub repository, open **Settings → Pages** and set the publishing source to the `gh-pages` branch and its root (`/`) folder, if it is not already configured.
5. Wait for the Pages deployment to finish. The site should be available at:

   `https://ukoder.github.io/faisla-game/`

The deploy command requires Git to be configured and authenticated with permission to push to the repository. If publishing fails with a permissions or authentication error, configure GitHub access first, then rerun the command.

## 8. Backend (not required to play)

The `backend` folder contains a separate placeholder Node.js service. The game frontend does not currently call it, so you do not need to start it to run, build, or deploy the game. If you specifically want to run the backend for development, open a second terminal and use:

```powershell
cd C:\Users\vathu\Downloads\prep\faisla-game\backend
npm ci
npm run dev
```

It listens at `http://localhost:4000`; its health endpoint is `http://localhost:4000/health`.

## Troubleshooting

- **`npm` or `node` is not recognized:** Install Node.js, then close and reopen the terminal.
- **`ENOENT` or missing `package.json`:** Change into the inner `faisla-game` folder for frontend commands. The backend has its own `package.json` in `backend`.
- **Port 5173 or 4173 is already in use:** Vite prints another available local address; open the address it reports.
- **The deployed page is blank or assets are missing:** Confirm that GitHub Pages publishes the `gh-pages` branch from `/` and that the deployment completed. This project is configured for the `/faisla-game/` Pages path.
