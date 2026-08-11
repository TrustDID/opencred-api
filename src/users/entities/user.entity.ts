import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Credential } from "../../credentials/entities/credential.entity";

/**
 * User represents a platform account. Users can hold credentials issued to them
 * (as subjects) and, when verified, act on behalf of an Issuer.
 *
 * The primary identifier is the Stellar wallet address; email-based passwords
 * are optional and only present when a user signs up with email/password.
 */
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  walletAddress!: string;

  @Column({ nullable: true, unique: true })
  email?: string | null;

  @Column({ nullable: true })
  displayName?: string | null;

  @Column({ nullable: true, select: false })
  passwordHash?: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Credential, (credential) => credential.subject)
  credentials!: Credential[];
}
