import { Router } from "express";

const router = Router ()

// Cremos rutas para usuarios
router.get("/", (req, res) => {
    // lógica de la infor que recuperamos de los usuarios
    return res.send("GET USUARIO");
  });

export{router}