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
    return res.json(portfolios);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido realizar la consulta",
      // esto lo utilizamos para que nos salte el tipo de error
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
    //Lógica para actualizar portfolio
    const portfolioId = req.params.id;
    const { worker_id, product_id } = req.body;

    await Portfolio.update(
      {
        id: parseInt(portfolioId),
      },
      {
        worker_id,
        product_id,
      }
    );

    return res.json("Ha sido actualizado con éxito");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha actualizado el portfolio",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const deletePortfolioById = async (req: Request, res: Response) => {
  try {
    const portfolioIdToDelete = req.params.id;
    const portfolioToRemove = await Portfolio.findOneBy({
      id: parseInt(portfolioIdToDelete),
    });

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
      // esto lo utilizamos para que nos salte el tipo de error
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
