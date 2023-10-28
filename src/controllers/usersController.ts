import { Request, Response } from "express";
import { Users } from "../models/User";

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

const createUser = async (req: any, res: Response) => {
  //lógica para crear usuarios
  try {
    // recuparemos la información que nos envían desde el body
    const {name, surname, phone, email, password} = req.body
    const newUser = await Users.create({
      name,
      surname,
      phone,
      email,
      password,
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

const updateUser = (req: Request, res: Response) => {
  //lógica para actualizar usuarios
  return res.send("ACTUALIZAR USUARIO");
};

const deleteUser = (req: Request, res: Response) => {
  //lógica para eliminar usuarios
  return res.send("ELIMINAR USUARIO");
};

export { getUser, createUser, updateUser, deleteUser };
