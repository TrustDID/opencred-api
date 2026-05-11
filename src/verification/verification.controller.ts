import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { VerificationService } from "./verification.service";

/**
 * TODO (contributor): Replace stub responses with proper DTOs
 *   (VerifyCredentialDto, VerificationResultDto) from the dto/ folder.
 * TODO (contributor): Protect routes with JwtAuthGuard where appropriate.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("verification")
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  /**
   * Verify a credential by its on-chain ID.
   * TODO (contributor): Delegate to verificationService.verify(id) which should
   *   call BlockchainService to query the Soroban contract state.
   */
  @Get(":id")
  verify(@Param("id") _id: string): { message: string } {
    // TODO: return verificationService.verify(id);
    return {
      message: "Not implemented yet. See verification contributor issue.",
    };
  }

  /**
   * Submit a verification request for a credential payload.
   * TODO (contributor): Implement full verification flow — fetch from IPFS,
   *   check on-chain status, validate signature, return result.
   */
  @Post()
  request(@Body() _body: unknown): { message: string } {
    // TODO: return verificationService.request(body);
    return {
      message: "Not implemented yet. See verification contributor issue.",
    };
  }
}
