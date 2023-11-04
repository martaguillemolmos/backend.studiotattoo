import { Router } from "express";
import { createProduct,  updateProductById, getAllProducts, deleteProductById } from "../controllers/productsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ()

//Traer todos los productos
router.get ("/", getAllProducts)

//Super_admin y trabajador : Crear un producto
router.post("/", auth, createProduct);

//Super_admin y trabajador: Actualizar un producto 
router.put("/", auth, updateProductById);

// Super_admin: Eliminar un producto por el Id
router.delete("/", auth, isSuperAdmin,deleteProductById);

export {router}