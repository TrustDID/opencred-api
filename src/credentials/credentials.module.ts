import { Module } from "@nestjs/common";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";

/**
 * CredentialsModule handles issuance, retrieval, and revocation of verifiable
 * credentials across all supported types (certificates, employment records,
 * contribution badges, skill attestations).
 *
 * TODO (contributor): Import TypeOrmModule.forFeature([Credential]) once the
 *   Credential entity and PostgreSQL are configured.
 * TODO (contributor): Import BlockchainModule to anchor credentials on Soroban.
 * TODO (contributor): Import IpfsModule to store credential payloads.
 */
@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
