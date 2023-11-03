import { Router } from "express";
import { createUser, deleteUserbyId, getAllUsers,  loginUser, profileUser, updateUser, updateUsersById} from "../controllers/usersController";
import { auth } from "../middelware/auth";

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

//Un usuario actualiza 
router.put("/:id?", auth, updateUser);
//Superadmin pueda actualizar un usuario por el id
router.put("/update", updateUsersById);

//Eliminar un usuario por el Id
router.delete("/", deleteUserbyId);


export {router}

