import { Injectable } from "@nestjs/common";

/**
 * AuthService handles credential validation, JWT issuance, and token refresh.
 *
 * TODO (contributor): Inject UsersService to validate users during login.
 * TODO (contributor): Inject JwtService (@nestjs/jwt) to sign and verify tokens.
 * TODO (contributor): Implement validateUser(), login(), and refresh() methods.
 * TODO (contributor): Add Stellar wallet signature verification helper.
 */
@Injectable()
export class AuthService {
  // TODO: constructor(
  //   private readonly usersService: UsersService,
  //   private readonly jwtService: JwtService,
  // ) {}
}
