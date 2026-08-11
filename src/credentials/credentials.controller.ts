import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { CredentialsService } from "./credentials.service";
import { CredentialResponseDto } from "./dto/credential-response.dto";
import { IssueCredentialDto } from "./dto/issue-credential.dto";

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
   * Issue a new verifiable credential. The credential is validated against its
   * type schema and its metadata is persisted to PostgreSQL.
   *
   * TODO (contributor): Upload payload to IPFS and anchor on Soroban once the
   *   integration layers are implemented.
   */
  @Post()
  issue(@Body() body: IssueCredentialDto): Promise<CredentialResponseDto> {
    return this.credentialsService.issue(body);
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
