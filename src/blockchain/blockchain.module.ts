import { Module } from "@nestjs/common";
import { BlockchainController } from "./blockchain.controller";
import { BlockchainService } from "./blockchain.service";

/**
 * BlockchainModule is the Stellar / Soroban integration boundary.
 *
 * All on-chain reads and writes are routed through this module so that other
 * modules remain decoupled from the Stellar SDK.
 *
 * TODO (contributor): Add stellar-sdk / @stellar/stellar-sdk to dependencies.
 * TODO (contributor): Configure SorobanRpc.Server with the RPC URL from ConfigService.
 * TODO (contributor): Export BlockchainService for use by CredentialsModule and
 *   VerificationModule.
 */
@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
