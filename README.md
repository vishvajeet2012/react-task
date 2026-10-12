# Fastor React frontend

Standalone Vite + React + TypeScript frontend. The mobile signup, OTP, dashboard, and product views mirror the React Native screens, while desktop and tablet use responsive layouts.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 through `@tailwindcss/vite`
- TanStack Query for server state
- TanStack Router for typed client routes
- Zustand with persisted authentication state
- `vite-plugin-pwa` for manifest, service worker, and auto updates
- Sass available for future component-level styles
- Fastor theme tokens mirrored from the React Native app: Mulish, League Spartan, Inter, colors, spacing, and radii
- Fastor staging API integration for OTP registration, JWT login, and paginated restaurants

## API configuration

Copy `.env.example` to `.env` only when you need to override the default staging URL. POST requests are sent as `application/x-www-form-urlencoded`, and authentication is persisted through the Zustand store.

Local development forwards `/api` requests through the Vite proxy to `https://staging.fastor.ai`. Production uses that staging URL directly unless `VITE_FASTOR_API_URL` is configured; the Vite development proxy is not part of the production build.

Integrated endpoints:

- `POST /v1/pwa/user/register` — request OTP
- `POST /v1/pwa/user/login` — verify OTP and obtain a token
- `GET /v1/m/restaurant?city_id=118&page_no=1` — paginated restaurants with a Bearer token

For an offline demo, enter phone `123456` and OTP `123456`. This path uses demo authentication and restaurant data; other phone numbers use the API. Featured menu cards and product details use local data.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
src/
  app/                 Query client and router setup
  api/                 API clients and response types
  components/          Shared layout and UI components
  data/                Local menu and demo data
  hooks/               Authentication and restaurant queries
  pages/               Signup, OTP, dashboard, and product screens
  store/               Zustand stores
  theme/               React Native-aligned design tokens
  styles/              Shared styles and Tailwind theme
```

PWA output is generated during `npm run build` in `dist/`.
