import express from "express";
import { router as routerUser} from "./routes/usersRoutes"
import { AppDataSource } from "./db";

const PORT = process.env.PORT || 4000;

const app = express();
app.use  (express.json())

app.use('/user', routerUser)

AppDataSource

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});





