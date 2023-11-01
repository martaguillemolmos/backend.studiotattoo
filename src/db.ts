import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUser1698499884384 } from "./migration/1698499884384-create-table-user";
import { Users } from "./models/User";
import { CreateTableProduct1698678287968 } from "./migration/1698678287968-create-table-product";
import { Product } from "./models/Product";
import { CreateTablePortfolio1698687487724 } from "./migration/1698687487724-create-table-portfolio";
import { Portfolio } from "./models/Portfolio";
import { CreateTableWorker1698581245632 } from "./migration/1698581245632-create-table-worker";
import { Worker } from "./models/Worker";
import { CreateTableAppointment1698769661453 } from "./migration/1698769661453-create-table-appointment";
import { Appointment } from "./models/Appointment";


type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Worker, Product, Portfolio, Appointment],
  migrations: [CreateTableUser1698499884384, CreateTableWorker1698581245632,CreateTableProduct1698678287968, CreateTablePortfolio1698687487724, CreateTableAppointment1698769661453],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
