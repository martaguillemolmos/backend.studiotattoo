import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", getUser);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", (req, res) => {
    //lógica para eliminar usuarios
    return res.send("ELIMINAR USUARIO");
  });

export{router}

