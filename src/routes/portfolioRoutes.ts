import { Router } from "express";
import { createPortfolio, deletePortfolioById, getPortfolio, updatePortfolioById} from "../controllers/portfoliosController";
import { auth } from "../middelware/auth";

const router = Router ()

router.get ("/", getPortfolio)

router.post ("/", createPortfolio)

router.put ("/:id", updatePortfolioById)

router.delete ("/:id", deletePortfolioById)

export {router}