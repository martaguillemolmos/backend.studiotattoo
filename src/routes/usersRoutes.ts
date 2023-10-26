import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", getUser);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", deleteUser);

export{router}

