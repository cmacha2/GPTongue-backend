import { config } from 'dotenv';

config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cargarCredencialesGoogle } from './google-creds-loader'; // Importa la función


async function bootstrap() {
  cargarCredencialesGoogle();  // Ejecuta la función antes de iniciar tu app
  const app = await NestFactory.create(AppModule);
  console.log(`iniciando servidor`)
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
