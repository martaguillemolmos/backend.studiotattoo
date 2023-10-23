import express from "express";
import { router as routerUser} from "./routes/usersRoutes"

const PORT = process.env.PORT || 4000;

const app = express();
app.use  (express.json())

app.use('/user', routerUser)

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});


app.post("/user", (req, res) => {
  //lógica para crear usuarios
  return res.send("CREAR USUARIO");
});

app.put("/user", (req, res) => {
  //lógica para actualizar usuarios
  return res.send("ACTUALIZAR USUARIO");
});

app.delete("/user", (req, res) => {
  //lógica para eliminar usuarios
  return res.send("ELIMINAR USUARIO");
});
