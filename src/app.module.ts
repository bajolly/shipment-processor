import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentsModule } from './shipments/shipments.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ShipmentsModule, ConfigModule.forRoot(
    {
      envFilePath: '.env',
      ignoreEnvFile: false
    }), TypeOrmModule.forRoot({

      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true //TURN THIS OFF IN PRODUCTION
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
