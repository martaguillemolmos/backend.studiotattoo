import { Router } from "express";
import { createPortfolio, deletePortfolioById, getPortfolio, updatePortfolioById} from "../controllers/portfoliosController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

//Acceder a todos los portfolios.
router.get ("/", auth, getPortfolio)

//Super_admin y Admin: crear un nuevo portfolio
router.post ("/:id?", auth, createPortfolio)

//Super_admin y Admin: Actualizar un portfolio
router.put ("/:id?", auth, updatePortfolioById)

//Super_admin: Eliminar un portfolio
router.delete ("/", auth, isSuperAdmin, deletePortfolioById)

export {router}