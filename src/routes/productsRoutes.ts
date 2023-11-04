import { Router } from "express";
import { createProduct,  updateProductById, getAllProducts, deleteProductById } from "../controllers/productsController";
import { auth } from "../middelware/auth";
const router = Router ()

//Traer todos los productos
router.get ("/", getAllProducts)

//Super_admin y trabajador : Crear un producto
router.post("/", auth, createProduct);

//Actualizar un producto 
router.put("/", auth, updateProductById);

//Eliminar un producto por el Id
router.delete("/:id", deleteProductById);

export {router}