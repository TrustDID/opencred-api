import { Module } from "@nestjs/common";
import { IpfsController } from "./ipfs.controller";
import { IpfsService } from "./ipfs.service";

/**
 * IpfsModule is the IPFS integration boundary.
 *
 * All credential payload uploads and retrievals are routed through this module.
 *
 * TODO (contributor): Choose and install an IPFS client library
 *   (e.g. kubo-rpc-client or web3.storage SDK).
 * TODO (contributor): Configure the client with gateway URL and API key
 *   from ConfigService.
 * TODO (contributor): Export IpfsService for use by CredentialsModule.
 */
@Module({
  controllers: [IpfsController],
  providers: [IpfsService],
  exports: [IpfsService],
})
export class IpfsModule {}
