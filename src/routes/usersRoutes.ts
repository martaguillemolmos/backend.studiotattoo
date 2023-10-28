import { Router } from "express";
import { createUser, deleteUser, getUser, updateUserById} from "../controllers/usersController";

const router = Router ()

// Cremos rutas para usuarios

router.get("/", getUser);

router.post("/", createUser);

router.put("/:id", updateUserById);

router.delete("/", deleteUser);

export {router}

