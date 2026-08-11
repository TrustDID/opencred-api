import { IsEnum, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";

import { CredentialType } from "../entities/credential.entity";

/**
 * Request payload for issuing a new credential (POST /credentials).
 *
 * Structural validation happens here via class-validator; type-specific
 * business rules (required metadata fields per credential type) are enforced
 * by CredentialsService.validateMetadata.
 */
export class IssueCredentialDto {
  @IsEnum(CredentialType)
  type!: CredentialType;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  issuerId!: string;

  @IsUUID()
  subjectId!: string;

  @IsObject()
  metadata!: Record<string, unknown>;
}
