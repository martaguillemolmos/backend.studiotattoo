import { Request, Response } from "express";

const getProduct = (req: Request, res:Response) => {
    return res.send("Todos los productos")
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