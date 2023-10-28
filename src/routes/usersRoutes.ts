import { Router } from "express";
import { createUser, deleteUserbyId, getUser, loginUser, updateUserById} from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

//Rutas para acceder a la información
//Acceder a todos los usuarios registrados
router.get("/", getUser);
router.get("/login", loginUser);

//Crear un usuario
router.post("/", createUser);

//Actualizar un usuario por el Id
router.put("/:id", updateUserById);

//Eliminar un usuario por el Id
router.delete("/:id", deleteUserbyId);


export {router}

