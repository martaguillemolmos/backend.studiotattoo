import { Request, Response } from "express";
import { Portfolio } from "../models/Portfolio";

// Recuperar todos los portfolios
//-- Me gustaría optimizar: cuando nos devuelve los resultados, que nos devuelva información del usuario y los datos organizados.
const getPortfolio = async (req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find({ relations: ["workerAppointment", "portfolioWorker"]});
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
      const { worker_id, product_id } = req.body;

      const newPortfolio = await Portfolio.create({
        worker_id,
        product_id,
      }).save();

      return res.json(newPortfolio);
   
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado el portfolio",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error, })
  }
};

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
