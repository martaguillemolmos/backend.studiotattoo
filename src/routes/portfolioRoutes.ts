import { Router } from "express";
import { createPortfolio, deletePortfolioById, getPortfolio, updatePortfolioById} from "../controllers/portfoliosController";
import { auth } from "../middelware/auth";

const router = Router ()

router.get ("/", getPortfolio)

//Ruta para poder crear un nuevo portfolio
router.post ("/:id?", auth, createPortfolio)

router.put ("/:id", updatePortfolioById)

router.delete ("/:id", deletePortfolioById)

export {router}