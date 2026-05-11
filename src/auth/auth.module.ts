import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

/**
 * AuthModule — authentication and authorization boundary.
 *
 * TODO (contributor): Install and configure @nestjs/jwt + @nestjs/passport.
 * TODO (contributor): Add JwtStrategy and LocalStrategy providers.
 * TODO (contributor): Implement Stellar wallet-based auth (sign-challenge flow).
 * TODO (contributor): Export JwtAuthGuard so other modules can protect routes.
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
