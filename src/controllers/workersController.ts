import { Request, Response } from "express";
import { Worker } from "../models/Worker";
import { Users } from "../models/User";
import { error } from "console";

// Super_Admin: Crear un nuevo trabajador.
const createWorker = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    //Buscamos el usuario correspondiente de la tabla usuarios
    const user = await Users.findOneBy({ id: user_id });
    const worker = await Worker.findOneBy ({user_id : user_id})

    if (!user) {
      return res.json({
        succes: false,
        message: "No se ha encontrado el usuario",
        error: error,
      });
    } 

    if(worker){
      return res.json("El trabajador ya existe.")
    }

    //Modificamos el rol del usuario a "admin"
    user.role = "admin";
    await user.save();

    //Añadimos los siguientes campos con un mensaje por defecto:
    const defaultFormation =
      "¡Bienvenido al equipo!, introduce aquí tu formación.";
    const defaultExperience =
      "¡Bienvenido al equipo!, introduce aquí tu experiencia.";

    // Por último, creamos el nuevo trabajadr
    const newWorker = await Worker.create({
      user_id,
      formation: defaultFormation,
      experience: defaultExperience,
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

// Super_Admin: Acceder a todos los trabajadores.
const getAllWorkers = async (req: any, res: Response) => {
  //lógica para crear un nuevo trabajador.
  try {
    const workers = await Worker.find({ relations: ["users"] });
    if (workers.length == 0) {
      return res.json("No hay trabajadores registrados.");
    } else {
      return res.json(workers);
    }
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

// Super_Admin y Worker: Actualizar la información.
const updateWorkerById = async (req: Request, res: Response) => {
  try {
    let worker;
    if (
      req.token.role == "super_admin" &&
      req.token.is_active == true &&
      req.params.id
    ) {
      console.log(req.params.id);
      worker = await Worker.findOne({
        where: { id: parseInt(req.params.id) },
      });
    } else if (req.token.role == "admin" && req.token.is_active == true) {
      //Lógica para actualizar usuarios por su Id
      worker = await Worker.findOne({
        where: { user_id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    //Lógica para actualizar usuarios por su Id
    const { formation, experience, is_active } = req.body;

    //Comprobamos que el usuario exista
    if (!worker) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }
    // Declaramos el id, de esta forma, podemos indicar en el caso que sea super admin, el id del usuario que queremos modificar lo recuperaremos de la búsqueda o bien,
    //en el caso que sea el propio usuario que quiera modificar sus datos, el id lo recuperamos del token.
    let id;
    // En caso del token del usuario nos proporciona el user_id del worker.

    if (req.token.role === "super_admin" && req.params.id) {
      id = parseInt(req.params.id);
      await Worker.update(
        { id: id },
        {
          formation,
          experience,
          is_active,
        }
      );
      return res.json("Ha sido actualizado con éxito.");
    } else {
      await Worker.findOne({ where: { user_id: req.token.id } });
    }
    await Worker.update(
      { id: id || worker?.id },
      {
        formation,
        experience,
        is_active,
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

//Super_Admin: Eliminar el trabajador.
const deleteWorkerById = async (req: Request, res: Response) => {
  try {
    // Recuperamos el valor del id a eliminar por el body.
    const workerIdToDelete = req.body.id;
    const workerToRemove = await Worker.findOneBy({
      id: parseInt(workerIdToDelete),
    });

    if (!workerToRemove){
      return res.json ("El trabajador que quieres eliminar no existe.")
    }
      const workerRemoved = await Worker.remove(workerToRemove as Worker);
      if (workerRemoved) {
        let user = await Users.findOneBy({id : workerToRemove.user_id});
        if (user?.role == "admin"){
          await Users.update({ id : user.id },{ role: "user"});
          return res.json("Se ha eliminado el usuario correctamente y se ha modificado el Rol.");
        } return res.json ("No se ha modificado el role del usuario, comprueba la BD.")
      } else {
      return res.json(
        "No se puede eliminar el usuario, porque es super_admin."
      );
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

export { getAllWorkers, createWorker, updateWorkerById, deleteWorkerById };
