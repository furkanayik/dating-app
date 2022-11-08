import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

const mockPrismaClient = {
  $connect: jest.fn(),
  $on: jest.fn(),
};
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(function () {
      this.$connect = mockPrismaClient.$connect;
      this.$on = mockPrismaClient.$on;
      return this;
    }),
  };
});

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module initialization', async () => {
    await service.onModuleInit();
    expect(mockPrismaClient.$connect).toHaveBeenCalled();
  });

  it('should register shutdown hooks', async () => {
    const mockApp = { close: jest.fn() } as unknown as INestApplication;
    await service.enableShutdownHooks(mockApp);
    expect(mockPrismaClient.$on).toHaveBeenCalled();
  });
});
