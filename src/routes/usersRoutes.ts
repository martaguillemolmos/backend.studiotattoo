import { Router } from "express";
import { getUser } from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", getUser);

router.post("/", (req, res) => {
    //lógica para crear usuarios
    return res.send("CREAR USUARIO");
  });

router.put("/", (req, res) => {
    //lógica para actualizar usuarios
    return res.send("ACTUALIZAR USUARIO");
  });

router.delete("/", (req, res) => {
    //lógica para eliminar usuarios
    return res.send("ELIMINAR USUARIO");
  });

export{router}

