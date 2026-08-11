import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

/**
 * UsersService manages platform user accounts.
 *
 * Only the domain helpers required by the credential flow are implemented
 * today; full user CRUD is tracked in the users contributor issue.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Resolve a user by id. Throws NotFoundException when the user does not
   * exist — used by CredentialsService to resolve the subject of a credential.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return user;
  }
}
