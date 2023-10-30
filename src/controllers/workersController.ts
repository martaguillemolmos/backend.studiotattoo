import { Request, Response } from "express";
import { Worker } from "../models/Worker";

const getWorkers = async (req: any, res: Response) => {
  try {
    const workers = await Worker.find();
    return res.json(workers);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No hemos traido ningun trabajador",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const createWorker = async (req: Request, res: Response) => {
  try {
    const { user_id, formation, experience } = req.body;
    console.log(req.body);
    const newWorker = await Worker.create({
      user_id,
      formation,
      experience,
    }).save();
    return res.json(newWorker);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No hemos creado ningun trabajador",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }

};

const updateWorkerById = (req: Request, res: Response) => {
  return res.send("Actualizar un trabajador");
};

const deleteWorkerById = (req: Request, res: Response) => {
  return res.send("Eliminar un trabajador");
};

export { getWorkers, createWorker, updateWorkerById, deleteWorkerById };
