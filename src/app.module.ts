import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import configuration from "./config/configuration";
import { databaseConfig } from "./config/database.config";

import { AuthModule } from "./auth/auth.module";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { CommonModule } from "./common/common.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { HealthModule } from "./health/health.module";
import { IpfsModule } from "./ipfs/ipfs.module";
import { IssuersModule } from "./issuers/issuers.module";
import { UsersModule } from "./users/users.module";
import { VerificationModule } from "./verification/verification.module";

/**
 * AppModule is the root module of the OpenCred API.
 *
 * TODO (contributor): Add ThrottlerModule for rate limiting.
 * TODO (contributor): Add a global HttpExceptionFilter once it is implemented
 *   in common/filters/.
 */
@Module({
  imports: [
    // Core configuration — loaded globally so every module can inject ConfigService.
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [configuration],
    }),

    // Database configuration
    TypeOrmModule.forRootAsync(databaseConfig),

    // Infrastructure modules — no domain logic, provide shared services.
    CommonModule,
    BlockchainModule,
    IpfsModule,

    // Domain modules.
    HealthModule,
    AuthModule,
    UsersModule,
    IssuersModule,
    CredentialsModule,
    VerificationModule,
  ],
})
export class AppModule {}