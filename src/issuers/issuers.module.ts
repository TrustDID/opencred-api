import { Module } from "@nestjs/common";
import { IssuersController } from "./issuers.controller";
import { IssuersService } from "./issuers.service";

/**
 * IssuersModule manages organizations that are permitted to issue credentials.
 *
 * TODO (contributor): Import TypeOrmModule.forFeature([Issuer]) once the Issuer
 *   entity and PostgreSQL are configured.
 * TODO (contributor): Add IssuerVerificationService to validate issuer status
 *   on-chain via the BlockchainModule.
 */
@Module({
  controllers: [IssuersController],
  providers: [IssuersService],
  exports: [IssuersService],
})
export class IssuersModule {}
