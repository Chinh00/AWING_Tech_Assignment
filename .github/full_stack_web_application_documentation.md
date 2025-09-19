# Project Name

A full-stack web application with:
- Backend: ASP.NET Core (net9.0), C# 13, Razor ASP.NET Core
- Frontend: React 19 + TypeScript 5.8 (Vite), MUI, Tailwind CSS, React Query, React Hook Form
- Package manager: npm

## Table of Contents
- Overview
- Architecture
- Backend
- Frontend
- Shared Conventions
- Local Development
- Environment Variables
- API Contract
- Error Handling
- Validation
- State Management and Data Fetching
- UI/UX
- Testing
- Linting and Formatting
- Build and Deployment
- Troubleshooting

## Overview
Brief description of the app, target users, and core value.
- TODO: Add product summary
- TODO: Link designs / product docs

## Architecture
- Client: SPA served by Vite dev server in dev; static assets served by CDN or backend in prod.
- Server: ASP.NET Core minimal API/Controllers, Razor (if SSR or admin pages), REST endpoints returning JSON.
- Communication: HTTPS JSON over Axios. React Query manages caching and background refetch.
- Auth: TODO: JWT/Cookies/OIDC (specify).
- Data: TODO: Database and ORM (e.g., EF Core + SQL Server/Postgres).
- CI/CD: TODO: GitHub Actions/Azure DevOps/other.

Diagram (logical):
Client (React/Vite) <-> API (ASP.NET Core) <-> DB
                                         ^ Logs/Monitoring
                                         ^ Cache (optional)
                                         ^ Message Bus (optional)

## Backend
- Framework: ASP.NET Core net9.0, C# 13
- Structure (suggested):
  - src/Api
  - src/Application
  - src/Domain
  - src/Infrastructure
- Key packages: TODO: EF Core, Serilog, Swashbuckle, etc.

Features:
- Controllers or Minimal APIs for REST.
- DTOs for request/response.
- Fluent validation or data annotations.
- Swagger/OpenAPI for API docs.
- Global exception handling middleware mapping errors to ProblemDetails.
- Logging & observability (Serilog/OpenTelemetry recommended).

Typical pipeline:
- Request -> Middleware (Auth, Validation, Exception) -> Handler/Service -> Repository -> DB -> Response

Example endpoints:
- GET /api/v1/items
- GET /api/v1/items/{id}
- POST /api/v1/items
- PUT /api/v1/items/{id}
- DELETE /api/v1/items/{id}

Configuration:
- appsettings.json + appsettings.{Environment}.json
- Environment variables override

Security:
- HTTPS enforced
- CORS configured for frontend origin
- AuthZ policies and roles

## Frontend
- Tooling: Vite 7, React 19, TypeScript 5.8, react-dom 19
- State/Data: @tanstack/react-query for server cache; local UI state via React hooks.
- Forms: react-hook-form + @hookform/resolvers + Yup.
- UI: @mui/material + @emotion + Tailwind CSS; icons via lucide-react.
- Notifications: react-toastify.
- HTTP: axios.
- Linting: eslint, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh.

Suggested src structure:
- src/
  - app/ (App shell, routes, providers)
  - components/ (reusable UI)
  - features/ (domain slices: items/, auth/, users/)
  - hooks/
  - libs/ (axios client, query client, utils)
  - pages/
  - styles/ (Tailwind setup, global.css)
  - types/ (shared TS types)
  - api/ (API clients, query keys)
  - validation/ (Yup schemas)

Routing:
- React Router (if used) or file-based (if configured). TODO: Specify.

Data fetching patterns:
- Query: useQuery({ queryKey, queryFn })
- Mutation: useMutation({ mutationFn, onSuccess: invalidateQueries })

Form pattern:
- useForm({ resolver: yupResolver(schema) })
- Controlled components via RHF + MUI

Styling:
- Tailwind utility classes for layout + spacing
- MUI components for widgets; theme overrides via Emotion
- Consistent design tokens (colors/spacing/typography)

## Shared Conventions
- DTO/Model parity: Keep TS types aligned with backend DTOs. Consider openapi-typescript or manual types.
- Error shape: ProblemDetails-like { title, detail, status, errors? }.
- Date/time: ISO 8601 UTC.
- IDs: GUID/ULID (specify).

## Local Development

Prerequisites:
- Node.js LTS, npm
- .NET SDK 9
- Database (Docker or local)

Backend:
- Setup env: cp appsettings.Development.example.json appsettings.Development.json
- Run:
  - dotnet restore
  - dotnet build
  - dotnet run --project src/Api
- Swagger UI at: http://localhost:PORT/swagger

Frontend:
- Setup env: cp .env.example .env.local
- Install: npm install
- Dev server: npm run dev
- Open: http://localhost:5173
- Build: npm run build
- Preview: npm run preview

Run both:
- Start API then frontend; ensure VITE_API_BASE_URL matches API URL.

## Environment Variables

Backend (examples):
- ASPNETCORE_ENVIRONMENT=Development
- ConnectionStrings__Default=...
- Jwt__Issuer=...
- Jwt__Audience=...
- Jwt__Key=...
- CORS__AllowedOrigins=http://localhost:5173

Frontend (Vite, prefix with VITE_):
- VITE_API_BASE_URL=http://localhost:PORT
- VITE_APP_NAME=...

## API Contract
- Versioning: /api/v1
- Content-Type: application/json
- Pagination: ?page=1&pageSize=20; response includes { data, total, page, pageSize }
- Filtering/sorting: ?q=...&sort=field:asc
- Error: ProblemDetails per RFC7807

Example response:
{
  "data": [{ "id": "..." }],
  "total": 100,
  "page": 1,
  "pageSize": 20
}

## Error Handling
Backend:
- ExceptionMiddleware -> ProblemDetails
- Validation errors -> 400 with field error map

Frontend:
- Axios interceptors map errors to to
