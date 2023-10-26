import { Router } from "express";
import { createUser, getUser } from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", getUser);

router.post("/", createUser);

router.put("/", (req, res) => {
    //lógica para actualizar usuarios
    return res.send("ACTUALIZAR USUARIO");
  });

router.delete("/", (req, res) => {
    //lógica para eliminar usuarios
    return res.send("ELIMINAR USUARIO");
  });

export{router}

