import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "studio_tatto",
  entities: [],
  migrations: [],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
