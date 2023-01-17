import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
 // const logger = new Logger('Main (main.ts)');
  
  const app = await NestFactory.create(AppModule, { });

  const configService = app.get(ConfigService);

  const ClientPort=parseInt(configService.get('CLIENT_PORT'));

  const port = parseInt(configService.get('PORT'));
  const CorsOptions={origin: [
    `http://localhost:${ClientPort}`,
   
  ], }

  app.enableCors(CorsOptions)
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(port);

 // logger.log(`Server running on port ${port}`);
}
bootstrap();