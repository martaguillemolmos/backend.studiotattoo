import { Request, Response } from "express";
import { Portfolio } from "../models/Portfolio";
import { Worker } from "../models/Worker";

// Recuperar todos los portfolios
//-- Me gustaría optimizar: cuando nos devuelve los resultados, que nos devuelva información del usuario y los datos organizados.
const getPortfolio = async (req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find({
      relations: ["workerAppointment", "portfolioWorker"],
    });
    if (portfolios.length == 0){
      return res.json ("Actualmente no existen portfolios.")
    }
    return res.json(portfolios);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido realizar la consulta",
      error: error,
    });
  }
};

// Super_admin y Admin: Crear un portfolio
const createPortfolio = async (req: Request, res: Response) => {
  try {
    let worker;
    if (
      req.token.role == "super_admin" &&
      req.token.is_active == true &&
      req.params.id
    ) {
      console.log(req.params.id);
      worker = await Worker.findOne({
        where: { id: parseInt(req.params.id) },
      });
    } else if (
      req.token.role !== "super_admin" &&
      req.token.is_active === true
    ) {
      worker = await Worker.findOne({
        where: { user_id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    if (!worker || worker.is_active == false){
      return res.json ("El usuario no existe.")
    }

    const { product_id } = req.body;
    
    const existPortfolio = await Portfolio.findOne({
      where: { worker_id: worker.id, product_id },
    });

    if (existPortfolio) {
      return res.json("El trabajador ya tiene un portfolio con este producto.");
    }
    
    const newPortfolio = await Portfolio.create({
      worker_id: worker?.id,
      product_id,
    }).save();
    return res.json(newPortfolio);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado el portfolio",
      error: error,
    });
  }
};

//Superadmin y Admin: Actualizar un portfolio.
const updatePortfolioById = async (req: Request, res: Response) => {
  try {

    let worker;
    if (
      req.token.role == "super_admin" &&
      req.token.is_active == true &&
      req.params.id
    ) {
      console.log(req.params.id);
      worker = await Worker.findOne({
        where: { id: parseInt(req.params.id) },
      });
    } else if (
      req.token.role !== "super_admin" &&
      req.token.is_active === true
    ) {
      worker = await Worker.findOne({
        where: { user_id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }
  
  const {portfolio_id, product_id, is_active} = req.body;
   
  let id;
   
    if (req.token.role === "super_admin" && req.params.id) {
      id = parseInt(req.params.id);
      await Portfolio.update(
        { id: id },
        {
          product_id,
          is_active,
        }
      );
      return res.json("Ha sido actualizado con éxito.");

    } else {
      await Worker.findOne({ where: { user_id: req.token.id } });
    }

    const portfolioWorker = await Portfolio.findOne({
      where: { worker_id: worker?.id, id:portfolio_id },
    });
    console.log("este es el worker.id",worker?.id)
    if(!portfolioWorker){
      return res.json ("No puedes actualizar un portfolio de otro usuario.")
    }

      await Portfolio.update(
      { id: portfolio_id },
      {
        product_id,
        is_active,
      }
    );
    return res.json("Ha sido actualizado con éxito, admin.");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha actualizado el portfolio",
      error: error,
    });
  }
};

//Super_admin: Eliminar un portfolio
const deletePortfolioById = async (req: Request, res: Response) => {
  try {
    const portfolioIdToDelete = req.body.id;
    const portfolioToRemove = await Portfolio.findOneBy({
      id: parseInt(portfolioIdToDelete),
    });

    if(!portfolioToRemove){
      return res.json ("El portfolio que quieres eliminar no existe.")
    }
    const portfolioRemoved = await Portfolio.remove(
      portfolioToRemove as Portfolio
    );
    if (portfolioRemoved) {
      return res.json("Se ha eliminado el portfolio correctamente");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado el portfolio",
      error: error,
    });
  }
};

export {
  getPortfolio,
  createPortfolio,
  updatePortfolioById,
  deletePortfolioById,
};
