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

const createProduct = async(req: Request, res:Response) => {
    //lógica para crear un nuevo producto
    try {
       // Recuperamos la información que nos envían desde el body
       const { type, product, price, description, image } = req.body;
    
       const newProduct = await Product.create({
           type,
           product,
           price,
           description,
           image
         }).save();
         return res.send(newProduct);

     } catch (error) {
       console.log(error);
       return res.json({
         succes: false,
         message: "No se ha creado el producto",
         // esto lo utilizamos para que nos salte el tipo de error
         error: error,
       });
     }
}


const updateProduct = (req: Request, res:Response) => {
    return res.send("Producto actualizado")
}

const deleteProduct = (req: Request, res:Response) => {
    return res.send("Producto eliminado")
}

export {getProduct, createProduct, updateProduct, deleteProduct}