import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  const usersRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("returns the user when found", async () => {
      const user = { id: "user-1", walletAddress: "GB..." };

      usersRepositoryMock.findOne.mockResolvedValue(user);

      await expect(service.findOne("user-1")).resolves.toEqual(user);
      expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: "user-1" },
      });
    });

    it("throws NotFoundException when the user does not exist", async () => {
      usersRepositoryMock.findOne.mockResolvedValue(null);

      await expect(service.findOne("user-1")).rejects.toThrow(NotFoundException);
    });
  });
});
