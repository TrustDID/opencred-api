# Contributing to OpenCred API

Thank you for your interest in contributing to OpenCred API! This guide provides comprehensive information to help you get started and contribute effectively to the project.

## Project Overview

OpenCred is a decentralized credential verification platform built with NestJS. It enables organizations to issue tamper-proof verifiable credentials anchored on the Stellar blockchain via Soroban smart contracts, with credential payloads stored on IPFS. The platform supports various credential types including certificates, employment records, contribution badges, and skill attestations.

This repository contains the backend API only. Smart contracts and front-end clients are maintained in separate repositories.

## Repository Structure

The project follows a modular architecture with the following structure:

```
src/
├── app.module.ts          # Main application module
├── main.ts                # Application entry point
├── config/                # Environment configuration factory
├── auth/                  # Authentication & JWT handling
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto/
│   └── entities/
├── users/                 # Platform user accounts management
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── dto/
│   └── entities/
├── issuers/               # Credential-issuing organizations
│   ├── issuers.controller.ts
│   ├── issuers.module.ts
│   ├── issuers.service.ts
│   ├── dto/
│   └── entities/
├── credentials/           # Credential lifecycle management
│   ├── credentials.controller.ts
│   ├── credentials.module.ts
│   ├── credentials.service.ts
│   ├── dto/
│   └── entities/
├── verification/          # Credential verification workflow
│   ├── verification.controller.ts
│   ├── verification.module.ts
│   ├── verification.service.ts
│   ├── dto/
│   └── entities/
├── blockchain/            # Stellar/Soroban integration
│   ├── blockchain.controller.ts
│   ├── blockchain.module.ts
│   ├── blockchain.service.ts
│   ├── dto/
│   └── entities/
├── ipfs/                  # IPFS storage integration
│   ├── ipfs.controller.ts
│   ├── ipfs.module.ts
│   ├── ipfs.service.ts
│   ├── dto/
│   └── entities/
├── common/                # Shared utilities and middleware
│   ├── common.controller.ts
│   ├── common.module.ts
│   ├── common.service.ts
│   ├── decorators/
│   ├── dto/
│   ├── entities/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── health/                # Health check endpoints
│   ├── health.controller.ts
│   ├── health.module.ts
│   ├── health.service.ts
│   └── health.service.spec.ts
├── app.module.ts
└── main.ts
```

## Local Development Setup

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- Git

### Installation Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/<your-username>/opencred-api.git
   cd opencred-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration values
   ```

4. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000/api`.

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run start:prod` - Start production server
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run lint` - Run ESLint with auto-fix

## Module Organization

The application is organized into isolated modules, each responsible for a specific domain:

| Module | Responsibility |
|--------|---------------|
| `auth` | Authentication, JWT token management, Stellar wallet challenge-response |
| `users` | CRUD operations for platform user accounts |
| `issuers` | Registration and management of credential-issuing organizations |
| `credentials` | Credential issuance, retrieval, and revocation lifecycle |
| `verification` | Orchestration of credential verification (IPFS fetch + blockchain check) |
| `blockchain` | Stellar SDK and Soroban smart contract integration |
| `ipfs` | IPFS upload and retrieval operations |
| `common` | Shared utilities: guards, filters, interceptors, pipes, decorators |
| `health` | Service health check endpoints |
| `config` | Environment configuration management |

Each module follows a consistent structure with:
- `module.ts` - NestJS module definition
- `controller.ts` - HTTP endpoints
- `service.ts` - Business logic
- `dto/` - Data transfer objects with validation
- `entities/` - TypeORM database entities

Modules communicate through dependency injection only - no direct controller imports between modules.

## Coding Standards

### TypeScript and Code Quality

- Use TypeScript with strict type checking
- Follow ESLint configuration with TypeScript recommended rules
- Use Prettier for code formatting
- All code must pass `npm run lint` without errors

### Code Style

- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow SOLID principles and NestJS best practices

### File Organization

- Place DTOs in `dto/` folders with class-validator decorators
- Place entities in `entities/` folders
- Keep controllers thin - delegate business logic to services
- Use dependency injection for all dependencies

## Pull Request Expectations

### Before Submitting

1. **Test locally**: Ensure `npm run test` and `npm run lint` pass
2. **Follow conventions**: Use proper branch naming and commit messages
3. **Update documentation**: Include relevant documentation updates
4. **Write tests**: Add unit tests for new functionality

### PR Template

Fill out the pull request template completely:
- Clear description of changes
- Link to related issues with `Closes #<issue-number>`
- List of breaking changes (if any)
- Testing instructions

### Review Process

1. Request review from maintainers
2. Address all review comments
3. Ensure CI checks pass
4. Squash commits if requested
5. Maintainers will merge approved PRs

### Branch Naming

```
feat/<module>-<description>     # New features
fix/<module>-<description>      # Bug fixes
refactor/<module>-<description> # Code refactoring
docs/<description>              # Documentation changes
test/<description>              # Test-related changes
```

### Commit Messages

Follow [Conventional Commits](https://conventionalcommits.org/):

```
feat(auth): add JWT refresh token endpoint
fix(credentials): handle expired credentials gracefully
refactor(common): extract pagination logic to shared service
docs(contributing): update PR guidelines
test(users): add integration tests for user registration
```

## Testing Expectations

### Unit Tests

- Write unit tests for all services, controllers, and utilities
- Place test files alongside source files: `*.spec.ts`
- Use `@nestjs/testing` and Jest framework
- Aim for high test coverage (>80%)

### Test Structure

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsService } from './credentials.service';

describe('CredentialsService', () => {
  let service: CredentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialsService],
    }).compile();

    service = module.get<CredentialsService>(CredentialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add comprehensive test cases
});
```

### Running Tests

```bash
npm run test         # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Generate coverage report
```

### Testing Guidelines

- Test both success and error scenarios
- Mock external dependencies (database, HTTP calls, etc.)
- Use descriptive test names
- Test edge cases and boundary conditions
- Ensure tests are fast and reliable

## Documentation Expectations

### API Documentation

- Use Swagger/OpenAPI for API documentation
- Document all endpoints with proper descriptions
- Include request/response examples
- Specify required permissions and authentication

### Code Documentation

- Add JSDoc comments for public methods and classes
- Document complex business logic
- Include type definitions for DTOs and entities

### README and Guides

- Keep README.md up to date with setup instructions
- Update API documentation for new endpoints
- Document environment variables in `.env.example`
- Maintain this contributing guide

### Commit Documentation

- Use clear, descriptive commit messages
- Reference issue numbers in commits when applicable
- Update CHANGELOG.md for significant changes

---

Thank you for contributing to OpenCred API! Your contributions help build a robust decentralized credential platform.