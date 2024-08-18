import { Dialect } from "sequelize";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
     mysql : {
        dialect : 'mysql' as Dialect,
        host: process.env.MYSQL_DATABASE_HOST,
        port: parseInt(process.env.MYSQL_DATABASE_PORT, 10) || 5432,
        username : process.env.MYSQL_DATABASE_USER,
        password : process.env.MYSQL_DATABASE_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        sync : false
     }
    }
  });