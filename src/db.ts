import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateTableUser1698499884384 } from "./migration/1698499884384-create-table-user";
import { Users } from "./models/User";
import { CreateTableWorker1698581245632 } from "./migration/1698581245632-create-table-worker";
import { Worker } from "./models/Worker";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "studio_tatto",
  entities: [Users, Worker],
  migrations: [CreateTableUser1698499884384, CreateTableWorker1698581245632],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
