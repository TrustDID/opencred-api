import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IssuersService } from "../issuers/issuers.service";
import { UsersService } from "../users/users.service";
import { CredentialResponseDto } from "./dto/credential-response.dto";
import { IssueCredentialDto } from "./dto/issue-credential.dto";
import {
  Credential,
  CredentialStatus,
  CredentialType,
} from "./entities/credential.entity";

/**
 * Required metadata fields per credential type.
 */
const CREDENTIAL_TYPE_SCHEMAS: Record<CredentialType, string[]> = {
  [CredentialType.CERTIFICATE]: ["institution", "qualification"],
  [CredentialType.EMPLOYMENT_RECORD]: ["role", "startDate"],
  [CredentialType.CONTRIBUTION_BADGE]: ["project"],
  [CredentialType.SKILL_ATTESTATION]: ["skill"],
};

/**
 * CredentialsService orchestrates the credential issuance flow:
 *
 *   1. Resolve the issuing organization.
 *   2. Resolve the subject (holder) user.
 *   3. Validate the credential payload against the schema for its type.
 *   4. Persist the credential metadata.
 *
 * IPFS storage and on-chain anchoring are added on top of this foundation
 * once the respective integration layers are implemented.
 */
@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialsRepository: Repository<Credential>,
    private readonly usersService: UsersService,
    private readonly issuersService: IssuersService,
  ) {}

  async issue(dto: IssueCredentialDto): Promise<CredentialResponseDto> {
    const issuer = await this.issuersService.findOne(dto.issuerId);
    const subject = await this.usersService.findOne(dto.subjectId);

    // TODO: Gate issuance on issuer.isVerified once on-chain issuer
    //       verification is implemented (see IssuersService.isVerified).
    this.validateMetadata(dto.type, dto.metadata);

    const credential = this.credentialsRepository.create({
      type: dto.type,
      title: dto.title,
      metadata: dto.metadata,
      issuer,
      subject,
      status: CredentialStatus.ACTIVE,
    });

    const saved = await this.credentialsRepository.save(credential);

    return this.toResponseDto(saved);
  }

  /**
   * Enforce the type-specific schema on the credential payload. Unknown
   * metadata keys are allowed — the schema only guards required fields.
   */
  private validateMetadata(
    type: CredentialType,
    metadata: Record<string, unknown>,
  ): void {
    const missing = CREDENTIAL_TYPE_SCHEMAS[type].filter((field) => {
      const value = metadata[field];

      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      throw new BadRequestException(
        `Invalid ${type} credential: missing required field(s): ${missing.join(", ")}`,
      );
    }
  }

  private toResponseDto(credential: Credential): CredentialResponseDto {
    return {
      id: credential.id,
      type: credential.type,
      title: credential.title,
      status: credential.status,
      issuerId: credential.issuerId,
      subjectId: credential.subjectId,
      metadata: credential.metadata,
      issuedAt: credential.issuedAt,
      createdAt: credential.createdAt,
      updatedAt: credential.updatedAt,
    };
  }
}
