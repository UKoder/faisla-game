# Faisla: Credentials and Technical Access Details

## 1. Submission summary

**API keys, application passwords, and test-user credentials: Not applicable.**

Faisla does not currently have user accounts, a login screen, or a third-party API integration that requires an API key. The frontend is a static, browser-based application. Reviewers can access the public demonstration site without credentials:

- **Application demo:** <https://ukoder.github.io/faisla-game/>
- **Source repository:** <https://github.com/UKoder/faisla-game>

The application can also be run locally by following [instructionfile.md](./instructionfile.md).

## 2. Authentication and access requirements

| Resource | Authentication required? | Access details |
|---|---|---|
| Public Faisla web application | No | Open the demo URL in a supported browser. |
| Local frontend development | No application credentials | Install Node.js/npm dependencies and run the frontend locally. |
| Frontend game data | No account | Game progress and preferences are stored in the browser's local storage. |
| GitHub source repository | No for public read access | Repository write and deployment permissions are managed by GitHub; they are not application credentials. |
| Optional backend | No authentication is implemented | Local development service described below; not required by the frontend. |

There are no dummy usernames or passwords to provide. The project includes a sample leaderboard record, but it is example data, not a login account or credential.

## 3. API keys, secrets, and environment configuration

The reviewed frontend and backend source/configuration do not define or require API keys, OAuth client secrets, database credentials, signing keys, or application passwords. No `.env` or `.env.*` file is present in the project working tree reviewed for this document.

The frontend uses Vite's built-in `import.meta.env.BASE_URL` for its deployment path; this is public build configuration, not a secret. The optional backend reads one environment variable:

| Variable | Required? | Default | Purpose |
|---|---|---|---|
| `PORT` | No | `4000` | Selects the listening port for the optional backend. |

No value needs to be submitted for `PORT` when running locally unless port `4000` is unavailable. It is not a credential.

## 4. Optional backend test access

The backend is a placeholder Node.js/Express service. The frontend does not currently make requests to it, and playing the game does not require the service.

When started locally, its default base address is `http://localhost:4000`. Available routes are:

| Method and path | Purpose | Authentication |
|---|---|---|
| `GET /health` | Returns a service health status | None |
| `GET /api/leaderboard` | Returns the in-memory sample leaderboard | None |
| `POST /api/leaderboard` | Adds a leaderboard entry to in-memory data | None |

The initial sample entry is **Demo Farmer** (120 days survived; score 780). It is fictional test data. Entries posted to this placeholder service are held in memory and are lost when the service restarts; there is no database.

**Important limitation:** The placeholder backend has no authentication or authorization and enables cross-origin requests. It is suitable only for local demonstration with non-sensitive sample data. Do not treat it as a production service or submit real personal data to it.

## 5. Local data and privacy note

The browser stores game progress, display/language preferences, and the optional farmer profile in `localStorage` on the device. This is not a server-side user account and is not synchronized through the placeholder backend. For demonstrations, use fictional profile details, especially on a shared device. Clear the browser's site data to remove locally saved application data.

Speech and vibration use browser/device capabilities and do not require application credentials.

## 6. Secure handling and reviewer access

- Do **not** put passwords, personal access tokens, private keys, or other secrets in this document, source files, screenshots, email attachments, or a public repository.
- Do not create a shared application login for this prototype; it has no login system.
- If an evaluator needs repository write or deployment access, grant an individual account the minimum required GitHub role through the organization's approved access process. Do not send a GitHub password or personal access token.
- If a future integration introduces a secret, issue a restricted credential through an approved password manager or secret vault, keep it out of source control and browser-delivered frontend code, and revoke or rotate temporary access after evaluation.

## 7. Scope of this assessment

This statement describes the current project working tree and configuration reviewed for submission. It is not an audit of Git history, individual GitHub account permissions, hosting-provider settings, or credentials held outside the project. Verify those separately with the repository or hosting administrator if the submission process requires them.
