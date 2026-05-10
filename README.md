## Prerequisites

Make sure these tools are installed on your system:
- Node.js `20+`
- npm `10+`
- A running BX-Track backend API

## Local Setup
1. Clone the repository and move into the frontend project:
```bash
git clone <repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a local environment file:
```bash
cp .env .env.local
```

If `.env` does not exist on your machine, create `.env.local` manually and add:
```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:3001
```

Replace the URL above with the actual local URL of your backend API.

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser:

```text
http://localhost:3000
```

The root route redirects to:

```text
http://localhost:3000/auth/login
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after build.

```bash
npm run lint
```

Runs ESLint checks.

## Environment Variables
The app currently depends on this public environment variable:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=
```
This value is used as the base URL for API requests from the frontend.

## Notes
- `.env*` files are gitignored, so local environment values stay on the developer machine.
- If the backend is not running or `NEXT_PUBLIC_BACKEND_BASE_URL` is missing, login and data APIs will not work.
- The project uses the App Router (`app/`) structure in Next.js.
