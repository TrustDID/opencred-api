import { Injectable } from "@nestjs/common";

/**
 * IssuersService manages registered credential-issuing organizations.
 *
 * TODO (contributor): Import Repository<Issuer> from TypeORM once the Issuer
 *   entity exists in entities/.
 * TODO (contributor): Implement findAll(), findOne(), create(), update(), remove().
 * TODO (contributor): Inject BlockchainService to register/revoke issuers on-chain.
 * TODO (contributor): Add isVerifiedIssuer() helper used by CredentialsService.
 */
@Injectable()
export class IssuersService {
  // TODO: constructor(
  //   @InjectRepository(Issuer)
  //   private readonly issuersRepository: Repository<Issuer>,
  //   private readonly blockchainService: BlockchainService,
  // ) {}
}
