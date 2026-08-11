import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Issuer } from "./entities/issuer.entity";
import { IssuersService } from "./issuers.service";

describe("IssuersService", () => {
  let service: IssuersService;

  const issuersRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuersService,
        { provide: getRepositoryToken(Issuer), useValue: issuersRepositoryMock },
      ],
    }).compile();

    service = module.get<IssuersService>(IssuersService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("returns the issuer when found", async () => {
      const issuer = { id: "issuer-1", name: "OpenCred Academy" };

      issuersRepositoryMock.findOne.mockResolvedValue(issuer);

      await expect(service.findOne("issuer-1")).resolves.toEqual(issuer);
      expect(issuersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: "issuer-1" },
      });
    });

    it("throws NotFoundException when the issuer does not exist", async () => {
      issuersRepositoryMock.findOne.mockResolvedValue(null);

      await expect(service.findOne("issuer-1")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("isVerified", () => {
    it("returns true for a verified issuer", async () => {
      issuersRepositoryMock.findOne.mockResolvedValue({ isVerified: true });

      await expect(service.isVerified("issuer-1")).resolves.toBe(true);
    });

    it("returns false for an unverified issuer", async () => {
      issuersRepositoryMock.findOne.mockResolvedValue({ isVerified: false });

      await expect(service.isVerified("issuer-1")).resolves.toBe(false);
    });
  });
});
