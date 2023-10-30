import { Request, Response } from "express";
import { Worker } from "../models/Worker";

const getWorkers = async (req: any, res: Response) => {
  try {
    const workers = await Worker.find({ relations: ['users'] });
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

const updateWorkerById = async (req: Request, res: Response) => {
  try {
    //Lógica para actualizar usuarios por su Id
    const workerId = req.params.id;
    const { formation, experience } = req.body;
    
    await Worker.update(
      {
        id: parseInt(workerId),
      },
      {
        formation,
        experience
      }
    );
    return res.json("Ha sido actualizado con éxito.");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha actualizado el usuario",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const deleteWorkerById = async(req: Request, res: Response) => {
  try {
    //Lógica para eliminar usuario por el Id
    const userIdToDelete = req.params.id;
    const userToRemove = await Worker.findOneBy (
      {
      id: parseInt(userIdToDelete),
    }
    )

    const userRemoved = await Worker.remove(userToRemove as Worker);
    if (userRemoved) {
      return res.json("Se ha eliminado el usuario correctamente");
    }

} catch (error) {
  console.log(error);
  return res.json({
    succes: false,
    message: "No se ha eliminado el trabajador",
    error: error,
  });
}
};

export { getWorkers, createWorker, updateWorkerById, deleteWorkerById };
