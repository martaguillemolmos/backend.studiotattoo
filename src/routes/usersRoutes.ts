import { Router } from "express";
import { createUser, deleteUserbyId, getUser, loginUser, profileUser, updateUserById} from "../controllers/usersController";
import { auth } from "../middelware/auth";

const router = Router ()

// Cremos rutas para usuarios

//Rutas para acceder a la información
//Acceder a todos los usuarios registrados
router.get("/", getUser);
router.get("/login", loginUser);

// Acceder al perfil de un usuario
router.get ("/profile", auth, profileUser)

//Crear un usuario
router.post("/", createUser);

//Actualizar un usuario por el Id
router.put("/:id", updateUserById);

//Eliminar un usuario por el Id
router.delete("/:id", deleteUserbyId);


export {router}

