import { Controller, Get } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";

/**
 * BlockchainController exposes diagnostic/status endpoints for the Stellar
 * integration. It is NOT intended to be the primary API surface — other modules
 * call BlockchainService directly.
 *
 * TODO (contributor): Add a GET /blockchain/network endpoint that returns
 *   connected network, ledger sequence, and contract statuses.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  /**
   * TODO (contributor): Return live Stellar network status from BlockchainService.
   */
  @Get("status")
  status(): { message: string } {
    // TODO: return blockchainService.getNetworkStatus();
    return {
      message: "Not implemented yet. See blockchain contributor issue.",
    };
  }
}
