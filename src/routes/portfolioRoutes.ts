import { Router } from "express";
import { createPortfolio, deletePortfolio, getPortfolio, updatePortfolio } from "../controllers/portfoliosController";

const router = Router ()

router.get ("/", getPortfolio)

router.post ("/", createPortfolio)

router.put ("/", updatePortfolio)

router.delete ("/", deletePortfolio)

export {router}