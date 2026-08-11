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
 * Issuer represents an organization permitted to issue credentials.
 * An issuer is uniquely identified by its Stellar wallet address and must be
 * verified before it can issue credentials.
 */
@Entity("issuers")
export class Issuer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string | null;

  @Column({ unique: true })
  walletAddress!: string;

  @Column({ nullable: true })
  website?: string | null;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Credential, (credential) => credential.issuer)
  credentials!: Credential[];
}
