import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )
    // .enableVersioning({
    //   type: VersioningType.URI,
    //   defaultVersion: [],
    // })
    .setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
