import { Router } from "express";
import { createProduct,  updateProduct, getProduct, deleteProduct } from "../controllers/productsController";
const router = Router ()

//Traer todos los productos
router.get ("/", getProduct)

//Crear un producto
router.post("/", createProduct);

//Actualizar un producto 
router.put("/:id", updateProduct);

//Eliminar un producto por el Id
router.delete("/:id", deleteProduct);

export {router}