import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

/**
 * UsersModule manages platform user accounts.
 *
 * TODO (contributor): Import TypeOrmModule.forFeature([User]) once the User
 *   entity and PostgreSQL are configured.
 * TODO (contributor): Export UsersService so AuthModule can inject it.
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
