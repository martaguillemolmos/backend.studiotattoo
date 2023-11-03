import { Router } from "express";
import { createWorker, deleteWorkerById, getAllWorkers, updateWorkerById } from "../controllers/workersController";

const router = Router ()

//Recuperar información de todos los trabajadores
router.get ("/", getAllWorkers)

//Crear un trabajador
router.post ("/", createWorker)

//Actualizar un usuario por el Id
router.put ("/:id", updateWorkerById)

//Eliminar un usuario por el Id
router.delete ("/:id", deleteWorkerById)

export {router}