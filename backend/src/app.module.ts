import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MySqlDBModule } from './database/mysql/mysql-db.module';
import configuration from '../config/configuration';
import { UserModule } from './resources/user-module/user.module';
import { ClinicModule } from './resources/clinic-module/clinic.module';
import { AuthModule } from './resources/auth-module/auth.module';
import { ServiceModule } from './resources/services-module/services.module';
import { SpecialityModule } from './resources/speciality-module/speciality.module';
import { DoctorTypeModule } from './resources/doctor-type-module/speciality.module';

const env = `${process.env.NODE_ENV ? `./config/env/.${process.env.NODE_ENV}.env` : './config/env/.env' }`

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : env,
      load : [configuration],
      isGlobal : true,
  }),
  MySqlDBModule,
  UserModule,
  AuthModule,
  ClinicModule,
  ServiceModule,
  SpecialityModule,
  DoctorTypeModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
