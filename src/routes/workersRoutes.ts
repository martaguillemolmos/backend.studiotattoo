import { Router } from "express";
import { createWorker, deleteWorkerById, getWorkers, updateWorkerById } from "../controllers/workersController";

const router = Router ()

//Recuperar información de todos los trabajadores
router.get ("/", getWorkers)

//Crear un trabajador
router.post ("/", createWorker)

//Actualizar un usuario por el Id
router.put ("/:id", updateWorkerById)

//Eliminar un usuario por el Id
router.delete ("/:id", deleteWorkerById)

export {router}