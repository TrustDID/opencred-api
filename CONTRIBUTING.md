# Contributing to OpenCred API

Thank you for considering a contribution to OpenCred! This document explains how
to set up the project locally, how work is organised into issues, and the
conventions every contributor should follow so the codebase stays clean and
welcoming.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Find Work](#how-to-find-work)
3. [Development Setup](#development-setup)
4. [Branch & Commit Conventions](#branch--commit-conventions)
5. [Architecture Overview](#architecture-overview)
6. [Module Responsibilities](#module-responsibilities)
7. [Adding a Feature](#adding-a-feature)
8. [Writing Tests](#writing-tests)
9. [Pull Request Process](#pull-request-process)
10. [Environment Variables](#environment-variables)

---

## Code of Conduct

By participating in this project you agree to abide by the
[Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Be respectful and constructive in all interactions.

---

## How to Find Work

Issues are the single source of truth for contributor tasks.

| Label                | Meaning                               |
| -------------------- | ------------------------------------- |
| `good first issue`   | Small, self-contained, well-scoped    |
| `help wanted`        | Open for any contributor to pick up   |
| `feat: auth`         | Scoped to the `AuthModule`            |
| `feat: credentials`  | Scoped to the `CredentialsModule`     |
| `feat: blockchain`   | Soroban / Stellar integration work    |
| `feat: ipfs`         | IPFS integration work                 |
| `feat: verification` | Credential verification workflow      |
| `infra: postgres`    | PostgreSQL + TypeORM setup            |
| `infra: swagger`     | OpenAPI / Swagger documentation setup |
| `bug`                | Bug fix                               |

**Before starting work**, comment on the issue to let others know you are
picking it up. This avoids duplicate effort.

---

## Development Setup

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- Git

### Steps

```bash
# 1. Fork and clone
git clone https://github.com/<your-fork>/opencred-api.git
cd opencred-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your local values

# 4. Start the dev server (hot-reload)
npm run start:dev
```

The API will be available at `http://localhost:3000/api`.

---

## Branch & Commit Conventions

### Branch names

```
feat/<short-description>      # new feature
fix/<short-description>       # bug fix
refactor/<short-description>  # non-functional change
docs/<short-description>      # documentation only
test/<short-description>      # tests only
```

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(credentials): add IssueCredentialDto with class-validator decorators
fix(auth): handle expired JWT tokens gracefully
refactor(common): extract pagination helper into CommonService
docs(contributing): clarify branch naming rules
test(users): add unit tests for UsersService.findAll
```

---

## Architecture Overview

```
src/
├── config/            Environment configuration factory
├── auth/              Authentication & JWT
├── users/             Platform user accounts
├── issuers/           Registered credential issuers
├── credentials/       Credential lifecycle (issue, retrieve, revoke)
├── verification/      Credential verification workflow
├── blockchain/        Stellar / Soroban smart-contract integration
├── ipfs/              IPFS storage integration
├── common/            Shared guards, filters, interceptors, pipes, decorators
└── health/            Health-check endpoint
```

Each module is intentionally isolated. Cross-module communication happens only
through injected services — never through direct imports of controllers.

---

## Module Responsibilities

| Module         | Responsibility                                                        |
| -------------- | --------------------------------------------------------------------- |
| `auth`         | Login, JWT issuance, token refresh, Stellar wallet challenge-response |
| `users`        | CRUD for platform user accounts                                       |
| `issuers`      | Registration and status management for credential-issuing orgs        |
| `credentials`  | Issuance, retrieval, and revocation of all credential types           |
| `verification` | Orchestrates IPFS fetch + on-chain status check for verification      |
| `blockchain`   | All Stellar SDK and Soroban contract calls (single integration point) |
| `ipfs`         | All IPFS uploads and retrievals (single integration point)            |
| `common`       | Shared utilities — guards, filters, interceptors, pipes, decorators   |
| `health`       | Liveness endpoint for infrastructure monitoring                       |

---

## Adding a Feature

1. Pick up an issue and comment to claim it.
2. Create a branch: `feat/<module>-<short-description>`.
3. Locate the relevant `TODO` comment in the service or controller file.
4. Implement only the scope described in the issue.
5. Add or update DTOs in the module's `dto/` folder using `class-validator`.
6. Write unit tests (see [Writing Tests](#writing-tests)).
7. Run `npm run lint` — the pipeline will fail on lint errors.
8. Open a pull request against `main`.

---

## Writing Tests

Unit tests live alongside the source file they test:

```
src/credentials/credentials.service.spec.ts
src/credentials/credentials.controller.spec.ts
```

Use `@nestjs/testing` and Jest:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { CredentialsService } from "./credentials.service";

describe("CredentialsService", () => {
  let service: CredentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialsService],
    }).compile();

    service = module.get<CredentialsService>(CredentialsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
```

Run tests:

```bash
npm run test          # all tests once
npm run test:watch    # watch mode
npm run test:cov      # coverage report
```

---

## Pull Request Process

1. Ensure `npm run test` and `npm run lint` both pass locally.
2. Fill in the pull request template completely.
3. Link the issue your PR resolves using `Closes #<issue-number>`.
4. Request a review from a maintainer.
5. Address all review comments before merging.
6. Squash commits if the maintainer asks for it.

---

## Environment Variables

All environment variables are documented in [`.env.example`](./.env.example).

Never commit a `.env` file. The `.gitignore` already excludes it.
If you need a new variable, add it to `.env.example` with a placeholder value
and document it here.

---

Thank you for contributing to OpenCred!
