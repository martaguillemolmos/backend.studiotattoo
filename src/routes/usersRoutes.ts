import { Router } from "express";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", (req, res) => {
    // lógica de la infor que recuperamos de los usuarios
    return res.send("GET USUARIO");
  });

router.post("/", (req, res) => {
    //lógica para crear usuarios
    return res.send("CREAR USUARIO");
  });

router.put("/", (req, res) => {
    //lógica para actualizar usuarios
    return res.send("ACTUALIZAR USUARIO");
  });

export{router}

