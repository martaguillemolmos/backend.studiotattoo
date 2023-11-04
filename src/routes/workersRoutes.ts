import { Router } from "express";
import { createWorker, deleteWorkerById, getAllWorkers, updateWorkerById } from "../controllers/workersController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

//Super_Admin: Crear un nuevo trabajador
router.post ("/", auth, isSuperAdmin, createWorker)

//Super_Admin: Recuperar información de todos los trabajadores
router.get ("/", auth, isSuperAdmin, getAllWorkers)

//Worker y Super_Admin: Actualizar un trabajador 
router.put ("/:id?",auth, updateWorkerById)

//Eliminar un usuario por el Id
router.delete ("/:id", deleteWorkerById)

export {router}