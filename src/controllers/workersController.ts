import { Request, Response } from "express"
import { Worker } from "../models/Worker"

const getWorkers = async (req: any, res: Response) => {
    try {
        const workers = await Worker.find ()
    return res.json(workers)
    } catch (error) {
        
    }

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