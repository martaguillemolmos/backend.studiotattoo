import { Router } from "express";
import { createPortfolio, deletePortfolioById, getPortfolio, updatePortfolioById} from "../controllers/portfoliosController";

const router = Router ()

router.get ("/", getPortfolio)

router.post ("/", createPortfolio)

router.put ("/:id", updatePortfolioById)

router.delete ("/:id", deletePortfolioById)

export {router}