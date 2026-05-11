import { Injectable } from "@nestjs/common";

/**
 * BlockchainService is the single integration point for all Stellar / Soroban
 * operations in the OpenCred platform.
 *
 * Stellar integration checklist (contributor)
 * --------------------------------------------
 * TODO: Install stellar-sdk: `npm install @stellar/stellar-sdk`
 * TODO: Inject ConfigService and read sorobanRpcUrl + network from config.
 * TODO: Initialise SorobanRpc.Server in onModuleInit().
 * TODO: Implement issueCredentialOnChain(payload) — invoke the credential
 *   issuance Soroban contract.
 * TODO: Implement revokeCredential(credentialId) — invoke revocation contract.
 * TODO: Implement getCredentialStatus(credentialId) — read contract state.
 * TODO: Implement verifySignature(publicKey, message, signature) — validate
 *   issuer signatures against the Stellar public key.
 * TODO: Add error handling for network timeouts and failed transactions.
 */
@Injectable()
export class BlockchainService {
  // TODO: private server: SorobanRpc.Server;
  //
  // TODO: constructor(private readonly configService: ConfigService) {}
  //
  // TODO: onModuleInit(): void {
  //   this.server = new SorobanRpc.Server(
  //     this.configService.get<string>("stellar.sorobanRpcUrl")!,
  //   );
  // }
}
