import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";

/**
 * TODO (contributor): Replace stub response shapes with proper DTOs
 *   (e.g. LoginDto, TokenResponseDto) from the dto/ folder.
 * TODO (contributor): Add @UseGuards(LocalAuthGuard) once passport is set up.
 * TODO (contributor): Add Swagger decorators once Swagger is configured
 *   (tracked separately).
 */
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * TODO (contributor): Implement email/password login.
   * TODO (contributor): Implement Stellar wallet challenge-response login.
   */
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() _body: unknown): { message: string } {
    // TODO: delegate to authService.login(body)
    return { message: "Not implemented yet. See auth contributor issue." };
  }

  /**
   * TODO (contributor): Implement token refresh.
   */
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(@Body() _body: unknown): { message: string } {
    // TODO: delegate to authService.refresh(body)
    return { message: "Not implemented yet. See auth contributor issue." };
  }
}
