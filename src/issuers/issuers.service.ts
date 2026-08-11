import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Issuer } from "./entities/issuer.entity";

/**
 * IssuersService manages registered credential-issuing organizations.
 *
 * Only the domain helpers required by the credential flow are implemented
 * today; full issuer CRUD and on-chain registration are tracked in the
 * issuers contributor issue.
 */
@Injectable()
export class IssuersService {
  constructor(
    @InjectRepository(Issuer)
    private readonly issuersRepository: Repository<Issuer>,
  ) {}

  /**
   * Resolve an issuer by id. Throws NotFoundException when the issuer does not
   * exist — used by CredentialsService before issuing a credential.
   */
  async findOne(id: string): Promise<Issuer> {
    const issuer = await this.issuersRepository.findOne({ where: { id } });

    if (!issuer) {
      throw new NotFoundException(`Issuer with id "${id}" not found`);
    }

    return issuer;
  }

  /**
   * Whether the issuer with the given id has been verified. Reserved for the
   * issuance gate once on-chain issuer verification is implemented.
   */
  async isVerified(id: string): Promise<boolean> {
    const issuer = await this.findOne(id);

    return issuer.isVerified;
  }
}
