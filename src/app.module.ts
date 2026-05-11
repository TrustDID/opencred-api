import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
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
 * TODO (contributor — PostgreSQL): Add TypeOrmModule.forRootAsync() below
 *   ConfigModule once the database issue is picked up:
 *
 *   TypeOrmModule.forRootAsync({
 *     inject: [ConfigService],
 *     useFactory: (config: ConfigService) => ({
 *       type: 'postgres',
 *       host:     config.get('database.host'),
 *       port:     config.get<number>('database.port'),
 *       username: config.get('database.username'),
 *       password: config.get('database.password'),
 *       database: config.get('database.name'),
 *       autoLoadEntities: true,
 *       synchronize: config.get('nodeEnv') === 'development', // never in prod
 *     }),
 *   }),
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
