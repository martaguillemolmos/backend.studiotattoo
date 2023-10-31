import { Request, Response } from "express";

const getPortfolio = (req: Request, res: Response) => {
    return res.send ("Todos los portfolios")
}

const createPortfolio = (req: Request, res: Response) => {
    return res.send ("Crear un portfolio")
}

const updatePortfolio = (req: Request, res: Response) => {
    return res.send ("Actualizar un portfolio")
}

const deletePortfolio = (req: Request, res: Response) => {
    return res.send ("Eliminar un portfolio")
}

export { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio}