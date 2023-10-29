import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecored } from "../types";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    //comprobamos que tenemos la pulsera
    if (!req.headers.authorization) {
      return res.json (
        {
        message: "auth_requiered"
      }
      )
    }
    console.log(req.headers.authorization);

    //En el token hemos almacenado los objetos que hemos enviado en la const token que hay dentro de const login, en el archivo usersController.

    const token = req.headers.authorization?.split(" ")[1];
    //comprobamos que existe
    if (!token) {
      return res.json({
        message: "auth_requiered"
      });
    }
    // hemos utilizado "secreto" y tenemos que escribir lo mismo que hemos indicado en la const token de usersController
    //comprobamos que ese token viene acompañado de "secreto"
    const tokenDecored = jwt.verify(token, "akiXi") as TokenDecored;
    //acceder  a la información del objeto. Para que deje de chillar este token, debemos de modificar en req, Request por any.
    req.token = tokenDecored;

    next()
  } catch (error) {
    return res.json({
      error: "Not auth",
    });
  }
};

export { auth };
