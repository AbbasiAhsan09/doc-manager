import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MySqlDBModule } from './database/mysql/mysql-db.module';
import configuration from '../config/configuration';
import { UserModule } from './resources/user-module/user.module';

const env = `${process.env.NODE_ENV ? `./config/env/.${process.env.NODE_ENV}.env` : './config/env/.env' }`

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : env,
      load : [configuration],
      isGlobal : true,
  }),
  MySqlDBModule,
  UserModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
