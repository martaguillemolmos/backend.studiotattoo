import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUser1698499884384 } from "./migration/1698499884384-create-table-user";
import { Users } from "./models/User";
import { CreateTableWorker1698581245632 } from "./migration/1698581245632-create-table-worker";
import { Worker } from "./models/Worker";

type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Worker],
  migrations: [CreateTableUser1698499884384, CreateTableWorker1698581245632],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
