import { Request, Response } from "express";

const getUser = (req: Request, res: Response) => {
    // lógica de la infor que recuperamos de los usuarios
    return res.send("GET USUARIO");
  }

const createUser= (req: Request, res: Response) => {
    //lógica para crear usuarios
    return res.send("CREAR USUARIO");
  }
export{getUser, createUser}