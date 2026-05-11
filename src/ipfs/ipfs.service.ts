import { Injectable } from "@nestjs/common";

/**
 * IpfsService is the single integration point for all IPFS operations.
 *
 * IPFS integration checklist (contributor)
 * -----------------------------------------
 * TODO: Choose an IPFS client: kubo-rpc-client (self-hosted node) or
 *   web3.storage / Pinata SDK (managed pinning service).
 * TODO: Inject ConfigService and read ipfs.gatewayUrl + ipfs.apiKey from config.
 * TODO: Implement upload(content): Promise<string> — pin a credential JSON
 *   document and return its CID.
 * TODO: Implement get(cid): Promise<unknown> — fetch and parse a document by CID.
 * TODO: Implement unpin(cid): Promise<void> — remove a pinned document
 *   (only when a credential is fully revoked).
 * TODO: Add retry logic and error handling for network failures.
 */
@Injectable()
export class IpfsService {
  // TODO: private client: KuboRpcClient | Web3StorageClient;
  //
  // TODO: constructor(private readonly configService: ConfigService) {}
  //
  // TODO: onModuleInit(): void {
  //   // Initialise the chosen IPFS client here.
  // }
}
