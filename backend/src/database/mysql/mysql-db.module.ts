import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { mysqlDBModels } from "./mysql-db.models";

@Module({
    imports : [
        SequelizeModule.forRootAsync({
            useFactory : ( configService : ConfigService ) : SequelizeModuleOptions => 
              (
                {
                    dialect : configService.get("database.mysql.dialect"),
                    database : configService.get("database.mysql.database"),
                    username : configService.get("database.mysql.username"),
                    port : configService.get("database.mysql.port"),
                    host : configService.get("database.mysql.host"),
                    models : mysqlDBModels
                }
               )
            ,
            inject : [ConfigService]
        })
    ],

})

export class MySqlDBModule {}