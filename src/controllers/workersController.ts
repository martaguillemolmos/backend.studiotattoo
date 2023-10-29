import { Request, Response } from "express"

const getWorkers = (req: Request, res: Response) => {
    return res.send("Todos los trabajadores")
}

const createWorker = (req: Request, res: Response) => {
    return res.send ("Crear un trabajador")
}

const updateWorkerById = (req: Request, res: Response) => {
    return res.send ("Actualizar un trabajador")
}

const deleteWorkerById = (req: Request, res: Response) => {
    return res.send ("Eliminar un trabajador")
}

export { getWorkers, createWorker, updateWorkerById, deleteWorkerById}