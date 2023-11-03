import { Router } from "express";
import { createWorker, deleteWorkerById, getAllWorkers, updateWorkerById } from "../controllers/workersController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

//Super_Admin: Crear un nuevo trabajador
router.post ("/", auth, isSuperAdmin, createWorker)

//Super_Admin: Recuperar información de todos los trabajadores
router.get ("/", auth, isSuperAdmin, getAllWorkers)

//Actualizar un usuario por el Id
router.put ("/:id", updateWorkerById)

//Eliminar un usuario por el Id
router.delete ("/:id", deleteWorkerById)

export {router}