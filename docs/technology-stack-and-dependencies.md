# Faisla: Technology Stack and Dependencies

## 1. Project overview

Faisla is a browser-based financial literacy game for farmers. Its primary application is a client-side React single-page application (SPA), built and served as static web assets. It can be installed as a Progressive Web App (PWA) and uses browser capabilities for offline caching, speech, vibration, and local storage.

The application does not require a database or backend server to run. A separate Express backend exists in the repository as a placeholder service and is not currently called by the frontend.

## 2. Application architecture and platform

| Area | Technology | Role |
|---|---|---|
| Programming language | JavaScript (ES modules) and JSX | Application and UI source code |
| UI framework | React | Component-based user interface |
| Rendering | React DOM | Renders the React application in the browser |
| Application type | Client-side single-page application | Game logic and screens run in the user's browser |
| Build and development server | Vite | Local development, asset bundling, production build, and build preview |
| Styling | Tailwind CSS with PostCSS | Utility-based styling and CSS processing |
| Navigation | React Router | Client-side routes and navigation |
| State management | Zustand | Stores game state in the frontend |
| Animation | Framer Motion | Card and interface animations |
| PWA and offline support | `vite-plugin-pwa` and Workbox | Generates the web app manifest and service worker for asset caching |
| Browser persistence | Web Storage API (`localStorage`) | Saves supported game data on the user's device |
| Speech | Web Speech API | Reads card prompts aloud when supported by the browser and device |
| Haptics | Vibration API | Provides vibration feedback when supported by the device |
| Graphics | Inline SVG | Displays scalable icons without a separate icon package |
| Hosting/deployment target | GitHub Pages | Publishes the built static site |

Speech synthesis and vibration are browser/device capabilities, not separately installed npm packages. Their availability and voice selection can vary by browser, operating system, and device.

## 3. Frontend dependencies

The versions below are the exact versions recorded in `faisla-game/package-lock.json`. `package.json` declares compatible semver ranges (shown in parentheses); `npm ci` installs the locked versions.

### Runtime dependencies

| Package | Locked version (declared range) | Purpose |
|---|---:|---|
| `react` | 19.2.4 (`^19.2.4`) | UI component framework |
| `react-dom` | 19.2.4 (`^19.2.4`) | Browser rendering for React |
| `react-router-dom` | 7.13.1 (`^7.13.1`) | Client-side routing |
| `zustand` | 5.0.11 (`^5.0.11`) | Game state management |
| `framer-motion` | 12.36.0 (`^12.36.0`) | UI and card animations |

### Development, build, and deployment dependencies

These packages support development, linting, CSS processing, PWA generation, and deployment. They are not application-server dependencies.

| Package | Locked version (declared range) | Purpose |
|---|---:|---|
| `vite` | 7.3.2 (`^7.3.1`) | Development server and production bundler |
| `@vitejs/plugin-react` | 5.0.0 (`^5.0.0`) | React support in Vite |
| `vite-plugin-pwa` | 0.19.8 (`^0.19.8`) | PWA manifest and service-worker integration |
| `tailwindcss` | 4.2.1 (`^4.2.1`) | Utility-first CSS framework |
| `@tailwindcss/postcss` | 4.2.1 (`^4.2.1`) | Tailwind CSS integration with PostCSS |
| `postcss` | 8.5.8 (`^8.5.8`) | CSS transformation pipeline |
| `autoprefixer` | 10.4.27 (`^10.4.27`) | Adds browser-compatible CSS vendor prefixes |
| `eslint` | 9.39.4 (`^9.39.4`) | JavaScript linting |
| `@eslint/js` | 9.39.4 (`^9.39.4`) | ESLint's core JavaScript configuration |
| `eslint-plugin-react-hooks` | 7.0.1 (`^7.0.1`) | Lint rules for React Hooks |
| `eslint-plugin-react-refresh` | 0.5.2 (`^0.5.2`) | Lint support for React Fast Refresh |
| `globals` | 17.4.0 (`^17.4.0`) | Environment global definitions for ESLint |
| `@types/react` | 19.2.14 (`^19.2.14`) | React type declarations used by development tooling |
| `@types/react-dom` | 19.2.3 (`^19.2.3`) | React DOM type declarations used by development tooling |
| `gh-pages` | 6.3.0 (`^6.3.0`) | Publishes the generated `dist` directory to GitHub Pages |

## 4. Optional backend

The backend is a separate Node.js service under `backend/`. It currently provides a health endpoint and in-memory placeholder leaderboard routes. It is not required to install, run, build, or play the frontend game. Its placeholder data is not a persistent database.

| Package | Locked version (declared range) | Purpose |
|---|---:|---|
| `express` | 5.2.1 (`^5.2.1`) | HTTP server and API routes |
| `cors` | 2.8.6 (`^2.8.6`) | Cross-origin request middleware |

The backend uses CommonJS modules and the Node.js runtime. Express declares a minimum runtime of Node.js 18. The backend has its own `package.json` and `package-lock.json`; its dependencies are installed separately from the frontend.

## 5. Runtime and tooling requirements

- **Node.js:** Use Node.js 22.12 or later (or Node.js 20.19 or later) for the Vite 7 frontend tools.
- **npm:** Included with Node.js; use the version installed with the selected Node.js release.
- **Browser:** A current browser with JavaScript and modern web platform support. PWA installation, offline behavior, speech, and vibration support depend on the browser and device.
- **Backend:** Not required for the frontend. If the optional backend is run, use Node.js 18 or later.

## 6. Dependency management and reproducibility

The frontend and backend are separate npm projects, each with its own manifest and lockfile:

- Frontend manifest: `faisla-game/package.json`
- Frontend lockfile: `faisla-game/package-lock.json`
- Backend manifest: `backend/package.json`
- Backend lockfile: `backend/package-lock.json`

Version ranges in each manifest allow compatible updates. The corresponding lockfile records the exact dependency resolution. For reproducible installation, use `npm ci` inside the project directory whose dependencies you need. Frontend and backend dependencies must be installed separately.

This list covers the direct dependencies declared by the project. npm also installs transitive dependencies required by those packages; their exact versions are recorded in the corresponding lockfiles.

## 7. Scripts provided by the frontend project

Run these commands from the `faisla-game` application directory:

| Command | Result |
|---|---|
| `npm run dev` | Starts the local Vite development server |
| `npm run build` | Creates the production site in `dist/` |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs ESLint |
| `npm run deploy` | Builds the site and publishes `dist/` to GitHub Pages using `gh-pages` |


