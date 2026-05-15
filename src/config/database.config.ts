import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],

  inject: [ConfigService],

  useFactory: async (configService: ConfigService) => ({
    type: "postgres",

    host: configService.get<string>("database.host"),

    port: configService.get<number>("database.port"),

    username: configService.get<string>("database.username"),

    password: configService.get<string>("database.password"),

    database: configService.get<string>("database.name"),

    ssl: configService.get<boolean>("database.ssl")
      ? { rejectUnauthorized: false }
      : false,

    autoLoadEntities: true,

    synchronize: configService.get<string>("nodeEnv") === "development",

    logging: true,

    retryAttempts: 3,

    retryDelay: 3000,
  }),
};