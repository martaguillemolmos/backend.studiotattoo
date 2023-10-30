import { Router } from "express";
import { createProduct,  updateProductById, getProduct, deleteProduct } from "../controllers/productsController";
const router = Router ()

//Traer todos los productos
router.get ("/", getProduct)

//Crear un producto
router.post("/", createProduct);

//Actualizar un producto 
router.put("/:id", updateProductById);

//Eliminar un producto por el Id
router.delete("/", deleteProduct);

export {router}