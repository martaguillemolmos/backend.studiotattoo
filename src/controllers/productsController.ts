import { Request, Response } from "express";
import { Product } from "../models/Product";

const getProduct = async(req: Request, res:Response) => {
    //Lógica para recuperar la infor de todos nuestros productos
   try {
    const products = await Product.find ();
    return res.json(products)
   } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido recuperar los productos",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
   }
}

const createProduct = (req: Request, res:Response) => {
    return res.send("Producto creado")
}

const updateProduct = (req: Request, res:Response) => {
    return res.send("Producto actualizado")
}

const deleteProduct = (req: Request, res:Response) => {
    return res.send("Producto eliminado")
}

export {getProduct, createProduct, updateProduct, deleteProduct}