import { Request, Response } from "express";

const getUser = (req: Request, res: Response) => {
    // lógica de la infor que recuperamos de los usuarios
    return res.send("GET USUARIO");
  }

export{getUser}