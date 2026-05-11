import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";

/**
 * CredentialsController exposes endpoints for credential issuance, retrieval,
 * listing, and revocation.
 *
 * Supported credential types (all routed through this controller):
 *   - certificates
 *   - employment records
 *   - contribution badges
 *   - skill attestations
 *
 * TODO (contributor): Replace stub responses with proper DTOs
 *   (IssueCredentialDto, CredentialResponseDto) from the dto/ folder.
 * TODO (contributor): Protect mutation routes with JwtAuthGuard + IssuerGuard.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("credentials")
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  /** TODO (contributor): Return paginated credential list for the authenticated user. */
  @Get()
  findAll(): { message: string } {
    // TODO: return credentialsService.findAll();
    return {
      message: "Not implemented yet. See credentials contributor issue.",
    };
  }

  /** TODO (contributor): Return a single credential by ID. */
  @Get(":id")
  findOne(@Param("id") _id: string): { message: string } {
    // TODO: return credentialsService.findOne(id);
    return {
      message: "Not implemented yet. See credentials contributor issue.",
    };
  }

  /**
   * Issue a new verifiable credential.
   * TODO (contributor): Validate the request against IssueCredentialDto,
   *   upload payload to IPFS, anchor on Soroban, persist to DB.
   */
  @Post()
  issue(@Body() _body: unknown): { message: string } {
    // TODO: return credentialsService.issue(body);
    return {
      message: "Not implemented yet. See credentials contributor issue.",
    };
  }

  /**
   * Revoke a credential by ID.
   * TODO (contributor): Call BlockchainService to mark the credential as
   *   revoked on-chain, then update the DB record.
   */
  @Delete(":id/revoke")
  revoke(@Param("id") _id: string): { message: string } {
    // TODO: return credentialsService.revoke(id);
    return {
      message: "Not implemented yet. See credentials contributor issue.",
    };
  }
}
