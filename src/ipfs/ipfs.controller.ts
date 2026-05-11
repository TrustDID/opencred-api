import { Controller, Get, Param } from "@nestjs/common";
import { IpfsService } from "./ipfs.service";

/**
 * IpfsController exposes diagnostic and passthrough endpoints for IPFS.
 * Primary consumers are other NestJS modules via IpfsService injection.
 *
 * TODO (contributor): Add a GET /ipfs/:cid endpoint that resolves a CID via
 *   the configured gateway and streams the content.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("ipfs")
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  /**
   * TODO (contributor): Retrieve a document from IPFS by CID.
   */
  @Get(":cid")
  resolve(@Param("cid") _cid: string): { message: string } {
    // TODO: return ipfsService.get(cid);
    return { message: "Not implemented yet. See IPFS contributor issue." };
  }
}
