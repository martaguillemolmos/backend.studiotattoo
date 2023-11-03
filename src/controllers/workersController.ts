import { Request, Response } from "express";
import { Worker } from "../models/Worker";
import { Users } from "../models/User";
import { error } from "console";

const getWorkers = async (req: any, res: Response) => {
  //lógica para crear un nuevo trabajador.
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

//Crear un nuevo trabajador
const createWorker = async (req: Request, res: Response) => {
  try {
    const { user_id, formation, experience } = req.body;
    console.log(req.body);
  
  //Buscamos el usuario correspondiente de la tabla usuarios

  const user = await Users.findOneBy({ id: user_id});

  if (!user) {
    return res.json({
      succes: false,
      message: "No se ha encontrado el usuario",
      error: error
    })
  }
//Modificamos el rol del usuario a "admin"
  user.role = "admin";
  await user.save();

// Por último, creamos el nuevo trabajadr
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
    //Lógica para eliminar trabajador por el Id
    const workerIdToDelete = req.params.id;
    const workerToRemove = await Worker.findOneBy (
      {
      id: parseInt(workerIdToDelete),
    }
    )
  //Si no existe, enviamos el mensaje
  if (!workerToRemove){
    return res.status(404).json ("No hemos encontrado el trabajador")
  }
  // Buscamos en la tabla el user_id correspondiente a ese trabajador
  const user = await Users.findOneBy({ id: workerToRemove.user_id });

  if(!user){
    return res.status(404).json ("No hemos encontrado el usuario")
  } else {
    //Modificamos el rol del usuario a "admin"
    user.role = "user";
    await user.save();
  }

  //Eliminamos el trabajador
    const workerRemoved = await Worker.remove(workerToRemove as Worker);
    if (workerRemoved) {
      return res.json("Se ha eliminado el trabajador correctamente");
    }

} catch (error) {
  console.log(error);
  return res.json({
    succes: false,
    message: "No se ha eliminado el usuario",
    error: error,
  });
}
};

export { getWorkers, createWorker, updateWorkerById, deleteWorkerById };
