import { Router } from "express";
import { createProduct,  updateProductById, getAllProducts, deleteProductById } from "../controllers/productsController";
const router = Router ()

//Traer todos los productos
router.get ("/", getAllProducts)

//Crear un producto
router.post("/", createProduct);

//Actualizar un producto 
router.put("/:id", updateProductById);

//Eliminar un producto por el Id
router.delete("/:id", deleteProductById);

export {router}