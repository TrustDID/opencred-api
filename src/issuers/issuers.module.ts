import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IssuersController } from "./issuers.controller";
import { IssuersService } from "./issuers.service";
import { Issuer } from "./entities/issuer.entity";

/**
 * IssuersModule manages organizations that are permitted to issue credentials.
 *
 * TODO (contributor): Add IssuerVerificationService to validate issuer status
 *   on-chain via the BlockchainModule.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Issuer])],
  controllers: [IssuersController],
  providers: [IssuersService],
  exports: [IssuersService],
})
export class IssuersModule {}
