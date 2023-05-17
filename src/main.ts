import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  var whitelist = ['http://localhost:3001','https://ai-orch.uc.r.appspot.com'];
  app.enableCors({
    origin: function (origin, callback) {
      console.log('origin', origin)
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  });
  await app.listen(3000);
}
bootstrap();
