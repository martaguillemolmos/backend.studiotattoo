import { Router } from "express";
import { createUser, deleteUserbyId, getUser, updateUserById} from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

//Acceder a todos los usuarios registrados
router.get("/", getUser);

//Crear un usuario
router.post("/", createUser);

//Actualizar un usuario por el Id
router.put("/:id", updateUserById);

//Eliminar un usuario por el Id
router.delete("/:id", deleteUserbyId);

//Login

export {router}

