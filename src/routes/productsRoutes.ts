import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productsController";
const router = Router ()

//Traer todos los productos
router.get ("/", getProduct)

//Crear un producto
router.post("/", createProduct);

//Actualizar un producto 
router.put("/", updateProduct);

//Eliminar un producto por el Id
router.delete("/", deleteProduct);

export {router}