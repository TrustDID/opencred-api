# OpenCred API

> Decentralized credential verification platform — NestJS backend API.

OpenCred allows organizations to issue tamper-proof verifiable credentials
anchored on the Stellar blockchain via Soroban smart contracts, with credential
payloads stored on IPFS.

**This repository is the backend API only.** Smart contracts and front-end
clients live in separate repositories.

---

## Supported credential types

| Type | Description |
|---|---|
| Certificate | Academic or professional certifications |
| Employment record | Work history attestations |
| Contribution badge | Open-source or community contribution awards |
| Skill attestation | Verified skill endorsements |

---

## Architecture

```
src/
├── config/            Environment configuration factory
├── auth/              Authentication, JWT, Stellar wallet challenge-response
├── users/             Platform user accounts
├── issuers/           Registered credential-issuing organizations
├── credentials/       Credential issuance, retrieval, and revocation
├── verification/      Credential verification workflow
├── blockchain/        Stellar SDK / Soroban smart-contract integration layer
├── ipfs/              IPFS storage integration layer
├── common/            Shared guards, filters, interceptors, pipes, decorators
└── health/            Service liveness endpoint
```

Each module contains a `module.ts`, `controller.ts`, `service.ts`, a `dto/`
folder for request/response shapes, and an `entities/` folder for TypeORM
entities (to be added by contributors).

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Configure environment

```bash
cp .env.example .env
# Edit .env with your local values
```

See [`.env.example`](./.env.example) for all available variables.

### Run

```bash
npm run start:dev    # development (hot-reload)
npm run start:prod   # production build
```

### Test

```bash
npm run test         # run all unit tests
npm run test:cov     # with coverage report
npm run lint         # lint check
```
## PostgreSQL Setup

### Prerequisites

- PostgreSQL installed locally
- Node.js 20+
- npm 10+

### Create Database

Run the following command in PostgreSQL:

```sql
 CREATE DATABASE opencred;
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=opencred
DB_SSL=false
```

### Start Development Server

```bash
npm run start:dev
```

The application should successfully connect to PostgreSQL during startup.
---

## API surface (current scaffold)

All routes are prefixed with `/api`.

| Method | Route | Module | Status |
|---|---|---|---|
| `GET` | `/api/health` | health | ✅ Live |
| `POST` | `/api/auth/login` | auth | 🚧 Stub |
| `POST` | `/api/auth/refresh` | auth | 🚧 Stub |
| `GET` | `/api/users` | users | 🚧 Stub |
| `POST` | `/api/users` | users | 🚧 Stub |
| `GET` | `/api/users/:id` | users | 🚧 Stub |
| `PATCH` | `/api/users/:id` | users | 🚧 Stub |
| `DELETE` | `/api/users/:id` | users | 🚧 Stub |
| `GET` | `/api/issuers` | issuers | 🚧 Stub |
| `POST` | `/api/issuers` | issuers | 🚧 Stub |
| `GET` | `/api/issuers/:id` | issuers | 🚧 Stub |
| `PATCH` | `/api/issuers/:id` | issuers | 🚧 Stub |
| `DELETE` | `/api/issuers/:id` | issuers | 🚧 Stub |
| `GET` | `/api/credentials` | credentials | 🚧 Stub |
| `POST` | `/api/credentials` | credentials | 🚧 Stub |
| `GET` | `/api/credentials/:id` | credentials | 🚧 Stub |
| `DELETE` | `/api/credentials/:id/revoke` | credentials | 🚧 Stub |
| `GET` | `/api/verification/:id` | verification | 🚧 Stub |
| `POST` | `/api/verification` | verification | 🚧 Stub |
| `GET` | `/api/blockchain/status` | blockchain | 🚧 Stub |
| `GET` | `/api/ipfs/:cid` | ipfs | 🚧 Stub |

Stubs return a `{ message }` placeholder today. Each stub has a `TODO` comment
pointing to the contributor issue that implements it.

---

## Contributing

All implementation work is tracked as GitHub issues. See
[`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full guide including:

- How to claim an issue
- Branch and commit conventions
- How to write tests
- Pull request process

---

## Roadmap (pending contributor issues)

- [ ] PostgreSQL + TypeORM setup
- [ ] Auth module implementation (JWT + Stellar wallet)
- [ ] Users, Issuers, Credentials, Verification service implementations
- [ ] Stellar SDK + Soroban contract integration
- [ ] IPFS client integration
- [ ] Swagger / OpenAPI documentation
- [ ] Rate limiting and audit logging
- [ ] CI/CD pipeline

---

## License

[MIT](./LICENSE)
