import express from "express";
import 'dotenv/config'

import { router as routerUser} from "./routes/usersRoutes"
import { router as routerWorker } from "./routes/workersRoutes";

import { AppDataSource } from "./db";
import { router as routerProduct} from "./routes/productsRoutes";
import { router as routerPortfolio } from "./routes/portfolioRoutes";
import { router as routerAppointment} from "./routes/appointmentsRoutest";


const PORT = process.env.PORT || 4000;

const app = express();
app.use (express.json())

app.use('/user', routerUser)
app.use ('/worker', routerWorker)
app.use ('/product', routerProduct)
app.use ('/portfolio',  routerPortfolio )
app.use ('/appointment', routerAppointment)

AppDataSource.initialize()
.then(() => {
 console.log('Database connected');
 
 app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
})
.catch(error => {
 console.log(error)
})






