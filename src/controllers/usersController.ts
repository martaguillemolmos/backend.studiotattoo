import { Request, Response } from "express";
import { Users } from "../models/User";
import bcrypt from "bcrypt";

const getUser = async (req: any, res: Response) => {
  try {
    // lógica de la infor que recuperamos la información de TODOS los usuarios
    const users = await Users.find();
    return res.json(users);
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar los usuarios",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const loginUser = (req: Request, res: Response) => {
  return res.send("Login")
}

const createUser = async (req: any, res: Response) => {
  //Lógica para crear usuarios
  try {
    // Recuperamos la información que nos envían desde el body
    const { name, surname, phone, email, password } = req.body;
    // Tras recuperar la información, debemos encriptar la contraseña antes de guardarla.
    const encryptedPassword = bcrypt.hashSync (password, 10)
    const newUser = await Users.create({
      name,
      surname,
      phone,
      email,
      password: encryptedPassword,
    }).save();
    return res.json(newUser);
    // return res.json("CREATE USER")
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha creado usuario",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const updateUserById = async (req: any, res: Response) => {
  try {
    //Lógica para actualizar usuarios por su Id
    const userId = req.params.id;
    const { name, password } = req.body;
    
    await Users.update(
      {
        id: parseInt(userId),
      },
      {
        name,
        password
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

const deleteUserbyId = async(req: Request, res: Response) => {
  try {
      //Lógica para eliminar usuario por el Id
      const userIdToDelete = req.params.id;
      const userToRemove = await Users.findOneBy (
        {
        id: parseInt(userIdToDelete),
      }
      )
  
      const userRemoved = await Users.remove(userToRemove as Users);
      if (userRemoved) {
        return res.json("Se ha eliminado el usuario correctamente");
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

export { getUser, loginUser, createUser, updateUserById, deleteUserbyId };
