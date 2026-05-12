import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { UsersService } from "./users.service";

/**
 * TODO (contributor): Replace stub responses with proper DTOs
 *   (CreateUserDto, UpdateUserDto, UserResponseDto) from the dto/ folder.
 * TODO (contributor): Protect routes with JwtAuthGuard + RolesGuard.
 * TODO (contributor): Add Swagger decorators once Swagger is configured.
 */
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** TODO (contributor): Return paginated user list (admin only). */
  @Get()
  findAll(): { message: string } {
    // TODO: return usersService.findAll();
    return { message: "Not implemented yet. See users contributor issue." };
  }

  /** TODO (contributor): Return a single user by ID. */
  @Get(":id")
  findOne(@Param("id") _id: string): { message: string } {
    // TODO: return usersService.findOne(id);
    return { message: "Not implemented yet. See users contributor issue." };
  }

  /** TODO (contributors): Create a new user account. */
  @Post()
  create(@Body() _body: unknown): { message: string } {
    // TODO: return usersService.create(body);
    return { message: "Not implemented yet. See users contributor issue." };
  }

  /** TODO (contributors): Update a user record. */
  @Patch(":id")
  update(
    @Param("id") _id: string,
    @Body() _body: unknown,
  ): { message: string } {
    // TODO: return usersService.update(id, body);
    return { message: "Not implemented yet. See users contributor issue." };
  }

  /** TODO (contributor): Soft-delete a user and . */
  @Delete(":id")
  remove(@Param("id") _id: string): { message: string } {
    // TODO: return usersService.remove(id);
    return { message: "Not implemented yet. See users contributor issue." };
  }
}
