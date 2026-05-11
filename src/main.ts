import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // TODO (contributor — tracked issue): Configure Swagger / OpenAPI here.
  // Example setup when the time comes:
  //
  // import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
  // const config = new DocumentBuilder()
  //   .setTitle("OpenCred API")
  //   .setDescription("Decentralized credential verification on Stellar")
  //   .setVersion("0.1.0")
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api/docs", app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}

void bootstrap();
