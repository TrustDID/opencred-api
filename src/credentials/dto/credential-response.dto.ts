import { CredentialStatus, CredentialType } from "../entities/credential.entity";

/**
 * Response shape returned when a credential is issued.
 */
export class CredentialResponseDto {
  id!: string;

  type!: CredentialType;

  title!: string;

  status!: CredentialStatus;

  issuerId!: string;

  subjectId!: string;

  metadata!: Record<string, unknown>;

  issuedAt!: Date;

  createdAt!: Date;

  updatedAt!: Date;
}
