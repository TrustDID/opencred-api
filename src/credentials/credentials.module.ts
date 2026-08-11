import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IssuersModule } from "../issuers/issuers.module";
import { UsersModule } from "../users/users.module";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import { Credential } from "./entities/credential.entity";

/**
 * CredentialsModule handles issuance, retrieval, and revocation of verifiable
 * credentials across all supported types (certificates, employment records,
 * contribution badges, skill attestations).
 *
 * TODO (contributor): Import BlockchainModule to anchor credentials on Soroban.
 * TODO (contributor): Import IpfsModule to store credential payloads.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Credential]),
    UsersModule,
    IssuersModule,
  ],
  controllers: [CredentialsController],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
