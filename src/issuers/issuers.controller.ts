import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { IssuersService } from "./issuers.service";

/**
 * TODO (contributor): Replace stub responses with proper DTOs
 *   (CreateIssuerDto, UpdateIssuerDto, IssuerResponseDto) from the dto/ folder.
 * TODO (contributor): Protect mutation routes with JwtAuthGuard + AdminGuard.
 * TODO (contributor): Add on-chain registration call via BlockchainModule.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("issuers")
export class IssuersController {
  constructor(private readonly issuersService: IssuersService) {}

  /** TODO (contributor): Return paginated list of registered issuers. */
  @Get()
  findAll(): { message: string } {
    // TODO: return issuersService.findAll();
    return { message: "Not implemented yet. See issuers contributor issue." };
  }

  /** TODO (contributor): Return a single issuer by ID. */
  @Get(":id")
  findOne(@Param("id") _id: string): { message: string } {
    // TODO: return issuersService.findOne(id);
    return { message: "Not implemented yet. See issuers contributor issue." };
  }

  /** TODO (contributor): Register a new issuer organization. */
  @Post()
  create(@Body() _body: unknown): { message: string } {
    // TODO: return issuersService.create(body);
    return { message: "Not implemented yet. See issuers contributor issue." };
  }

  /** TODO (contributor): Update issuer metadata. */
  @Patch(":id")
  update(
    @Param("id") _id: string,
    @Body() _body: unknown,
  ): { message: string } {
    // TODO: return issuersService.update(id, body);
    return { message: "Not implemented yet. See issuers contributor issue." };
  }

  /** TODO (contributor): Deactivate an issuer. */
  @Delete(":id")
  remove(@Param("id") _id: string): { message: string } {
    // TODO: return issuersService.remove(id);
    return { message: "Not implemented yet. See issuers contributor issue." };
  }
}
