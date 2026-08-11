import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Issuer } from "../../issuers/entities/issuer.entity";
import { User } from "../../users/entities/user.entity";

/**
 * Supported credential types across the platform.
 */
export enum CredentialType {
  CERTIFICATE = "certificate",
  EMPLOYMENT_RECORD = "employment_record",
  CONTRIBUTION_BADGE = "contribution_badge",
  SKILL_ATTESTATION = "skill_attestation",
}

/**
 * Lifecycle status of a credential.
 */
export enum CredentialStatus {
  ACTIVE = "active",
  REVOKED = "revoked",
}

/**
 * Credential is the persisted metadata record for a verifiable credential.
 *
 * The credential payload itself is stored as flexible JSON in `metadata`
 * (and will later be uploaded to IPFS with the resulting CID stored here),
 * while `txHash` will hold the Soroban transaction once on-chain anchoring is
 * implemented.
 */
@Entity("credentials")
export class Credential {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: CredentialType })
  type!: CredentialType;

  @Column()
  title!: string;

  @Column({ type: "jsonb", default: () => "'{}'::jsonb" })
  metadata!: Record<string, unknown>;

  @Column({ type: "enum", enum: CredentialStatus, default: CredentialStatus.ACTIVE })
  status!: CredentialStatus;

  @Column({ type: "uuid" })
  issuerId!: string;

  @ManyToOne(() => Issuer, (issuer) => issuer.credentials, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "issuerId" })
  issuer!: Issuer;

  @Column({ type: "uuid" })
  subjectId!: string;

  @ManyToOne(() => User, (user) => user.credentials, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "subjectId" })
  subject!: User;

  @Column({ nullable: true })
  ipfsCid?: string | null;

  @Column({ nullable: true })
  txHash?: string | null;

  @CreateDateColumn()
  issuedAt!: Date;

  @Column({ nullable: true })
  revokedAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
