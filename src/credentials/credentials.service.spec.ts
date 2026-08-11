import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IssuersService } from "../issuers/issuers.service";
import { UsersService } from "../users/users.service";
import { CredentialsService } from "./credentials.service";
import { Credential, CredentialType } from "./entities/credential.entity";

describe("CredentialsService", () => {
  let service: CredentialsService;

  const credentialsRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const usersServiceMock = {
    findOne: jest.fn(),
  };

  const issuersServiceMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CredentialsService,
        {
          provide: getRepositoryToken(Credential),
          useValue: credentialsRepositoryMock,
        },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: IssuersService, useValue: issuersServiceMock },
      ],
    }).compile();

    service = module.get<CredentialsService>(CredentialsService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("issue", () => {
    const baseDto = {
      type: CredentialType.CERTIFICATE,
      title: "Blockchain Engineering Certificate",
      issuerId: "issuer-1",
      subjectId: "subject-1",
      metadata: {
        institution: "OpenCred Academy",
        qualification: "Professional Certificate",
      },
    };

    it("persists a valid credential and returns its metadata", async () => {
      issuersServiceMock.findOne.mockResolvedValue({
        id: baseDto.issuerId,
        isVerified: true,
      });
      usersServiceMock.findOne.mockResolvedValue({ id: baseDto.subjectId });
      credentialsRepositoryMock.create.mockReturnValue({
        issuerId: baseDto.issuerId,
        subjectId: baseDto.subjectId,
      });
      credentialsRepositoryMock.save.mockImplementation(async (credential) => ({
        id: "credential-1",
        status: "active",
        issuedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...credential,
        type: baseDto.type,
        title: baseDto.title,
        metadata: baseDto.metadata,
      }));

      const result = await service.issue(baseDto);

      expect(issuersServiceMock.findOne).toHaveBeenCalledWith(baseDto.issuerId);
      expect(usersServiceMock.findOne).toHaveBeenCalledWith(baseDto.subjectId);
      expect(credentialsRepositoryMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: baseDto.type,
          title: baseDto.title,
          metadata: baseDto.metadata,
          status: "active",
        }),
      );
      expect(credentialsRepositoryMock.save).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject({
        id: "credential-1",
        type: baseDto.type,
        title: baseDto.title,
        issuerId: baseDto.issuerId,
        subjectId: baseDto.subjectId,
      });
    });

    it("throws NotFoundException when the issuer does not exist", async () => {
      issuersServiceMock.findOne.mockRejectedValue(
        new NotFoundException(`Issuer with id "${baseDto.issuerId}" not found`),
      );

      await expect(service.issue(baseDto)).rejects.toThrow(NotFoundException);
      expect(credentialsRepositoryMock.save).not.toHaveBeenCalled();
    });

    it("throws NotFoundException when the subject does not exist", async () => {
      issuersServiceMock.findOne.mockResolvedValue({ id: baseDto.issuerId });
      usersServiceMock.findOne.mockRejectedValue(
        new NotFoundException(`User with id "${baseDto.subjectId}" not found`),
      );

      await expect(service.issue(baseDto)).rejects.toThrow(NotFoundException);
      expect(credentialsRepositoryMock.save).not.toHaveBeenCalled();
    });

    it("rejects metadata missing required fields for its type", async () => {
      issuersServiceMock.findOne.mockResolvedValue({ id: baseDto.issuerId });
      usersServiceMock.findOne.mockResolvedValue({ id: baseDto.subjectId });

      await expect(
        service.issue({
          ...baseDto,
          metadata: { institution: "OpenCred Academy" },
        }),
      ).rejects.toThrow(BadRequestException);
      expect(credentialsRepositoryMock.save).not.toHaveBeenCalled();
    });

    it("persists a credential whose type has a different schema", async () => {
      issuersServiceMock.findOne.mockResolvedValue({ id: baseDto.issuerId });
      usersServiceMock.findOne.mockResolvedValue({ id: baseDto.subjectId });
      credentialsRepositoryMock.save.mockImplementation(async (credential) => ({
        id: "credential-2",
        status: "active",
        ...credential,
      }));

      await expect(
        service.issue({
          ...baseDto,
          type: CredentialType.SKILL_ATTESTATION,
          title: "Rust Proficiency",
          metadata: { skill: "Rust" },
        }),
      ).resolves.toBeDefined();
    });
  });
});
