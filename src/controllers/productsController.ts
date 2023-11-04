import { Request, Response } from "express";
import { Product } from "../models/Product";
import { type } from "os";

//Recuperar todos los productos.
const getAllProducts = async(req: Request, res:Response) => {
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

//Super_admin y admin : Crear un nuevo producto.
const createProduct = async(req: Request, res:Response) => {
    //lógica para crear un nuevo producto
    try {
      // Tan sólo permitimos que si el token pertenece a un super-admin o bien a un admin y está activo, puede crear el nuevo producto.
      if ( (req.token.role == "super_admin" && req.token.is_active == true ) || (req.token.role == "admin" && req.token.is_active == true)) {
      // Recuperamos la información que nos envían desde el body
       const { type, product, price, description, image } = req.body;

      // Consultamos en la base de datos para verificar si este producto ya existe.
      const verifyProduct = await Product.findOneBy ({type , product, price, description})
        console.log(verifyProduct)
      if (verifyProduct){
        return res.json ("Este producto ya existe.")
      }
      
      // En el caso que no exista, creamos el nuevo producto.
       const newProduct = await Product.create({
        type,
        product,
        price,
        description,
        image
      }).save();
      return res.json (newProduct);
      } 
        return res.status(403).json({ message: "Usuario no autorizado" });

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

const updateProductById = async(req: Request, res:Response) => {
    try {
        //Lógica para actualizar productos por su Id
        const productId = req.params.id;
        const { type, product, price, description, image} = req.body;
        
        await Product.update(
          {
            id: parseInt(productId),
          },
          {
            type,
            product,
            price,
            description,
            image
          }
        );
        return res.json("Ha sido actualizado con éxito.");
      } catch (error) {
        console.log(error);
        return res.json({
          succes: false,
          message: "No se ha actualizado el producto",
          // esto lo utilizamos para que nos salte el tipo de error
          error: error,
        });
      }
}

const deleteProductById = async(req: Request, res:Response) => {
    try {
        //Lógica para eliminar producto por el Id
        const productIdToDelete = req.params.id;
        const productToRemove = await Product.findOneBy (
          {
          id: parseInt(productIdToDelete),
        }
        )
    
        const productRemoved = await Product.remove(productToRemove as Product);
        if (productRemoved) {
          return res.json("Se ha eliminado el producto correctamente");
        }
  
    } catch (error) {
      console.log(error);
      return res.json({
        succes: false,
        message: "No se ha eliminado el producto",
        error: error,
      });
    }
}

export {getAllProducts, createProduct, updateProductById, deleteProductById}