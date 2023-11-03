import { Router } from "express";
import { createUser, deleteUserById, getAllUsers,  loginUser, profileUser, updatePassword, updateUser} from "../controllers/usersController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

// Cremos rutas para usuarios

//Rutas para acceder a la información
//Acceder a todos los usuarios registrados
router.get("/", getAllUsers);
// Acceder al perfil de un usuario
router.get ("/profile", auth, profileUser)

//Crear un usuario
router.post("/", createUser);
// Login
router.post("/login", loginUser);

//Un usuario puede actualizar el password.
router.patch("/password", auth, updatePassword);
//Un usuario o el superadmin puede actualizar TODOS los datos.
router.put("/:id?", auth, updateUser);

//Eliminar un usuario por el Id, sólo el superadmin.
router.delete("/",auth, isSuperAdmin, deleteUserById);

export {router}

