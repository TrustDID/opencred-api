import { Module } from "@nestjs/common";
import { VerificationController } from "./verification.controller";
import { VerificationService } from "./verification.service";

/**
 * VerificationModule handles credential verification requests.
 *
 * TODO (contributor): Import TypeOrmModule.forFeature([VerificationRequest]) once
 *   the entity and PostgreSQL are configured.
 * TODO (contributor): Inject BlockchainModule to query Soroban contracts.
 * TODO (contributor): Inject IpfsModule to retrieve credential payloads.
 */
@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
