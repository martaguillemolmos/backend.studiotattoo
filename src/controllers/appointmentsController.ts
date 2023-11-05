import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Users } from "../models/User";
import { Portfolio } from "../models/Portfolio";

// Usuario y admin: Crear una cita
// Me gustaría modificar la forma de devolver la información cuando se crea la cita.
// Me gustarís comprobar que la fecha que nos indica para solicitar la fecha, es después de el día que se solicita.
const createAppointment = async (req: Request, res: Response) => {
  try {
    if ((req.token.role == "user", "admin" && req.token.is_active == true)) {
      //Recuperar el id del usuario por su token
      const user = await Users.findOne({
        where: { id: req.token.id },
      });

      if (!user) {
        return res.json("El usuario no existe.");
      }

      const { portfolio_id, day, hour } = req.body;

      const existPortfolio = await Portfolio.findOne({
        where: { id: portfolio_id },
      });

      const worker_id = existPortfolio?.worker_id;

      if (!existPortfolio) {
        return res.json("El portfolio no existe.");
      }

      if (user.id == worker_id) {
        return res.json(
          "Política de empresa: Un trabajador no puede hacerse un tatuaje él mismo."
        );
      }

      const existAppointment = await Appointment.findOne({
        where: { artist: worker_id, day, hour },
      });

      if (existAppointment) {
        return res.json("Cita no disponible: Introduce otra fecha y hora.");
      }

      const newAppointment = await Appointment.create({
        client: user.id,
        portfolio_id,
        artist: worker_id,
        day,
        hour,
      }).save();
      return res.json(newAppointment);
    }
    return res.json("Usuario no autorizado.");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha creado la cita",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

// SuperAdmin: Recuperar la información de TODAS las citas.
//-- Me gustaría optimizar: cuando nos devuelve los resultados, que nos devuelva información del usuario y los datos organizados.
const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    if (appointments.length == 0) {
      return res.json("Actualmente no existen portfolios.");
    }
    return res.json(appointments);
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha podido realizar la consulta",
      error: error,
    });
  }
};

//Recuperar todas las citas activas según el id o bien, si eres superAdmin TODAS.
// Crear nuevo endpoint

const updateAppointment = async (req: Request, res: Response) => {
  try {
    //Lógica para actualizar portfolio
    const appointmentId = req.params.id;
    const { artist, portfolio_id, day, hour, status_appointment } = req.body;

    await Appointment.update(
      {
        id: parseInt(appointmentId),
      },
      {
        artist,
        portfolio_id,
        day,
        hour,
        status_appointment,
      }
    );

    return res.json("La cita ha sido actualizada con éxito");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha actualizado la cita",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentIdToDelete = req.params.id;
    const appointmentToRemove = await Appointment.findOneBy({
      id: parseInt(appointmentIdToDelete),
    });

    if (!appointmentToRemove) {
      return res.json("La cita que quieres eliminar no exste.");
    }
    const appointmentRemoved = await Appointment.remove(
      appointmentToRemove as Appointment
    );
    if (appointmentRemoved) {
      return res.json("Se ha eliminado la cita correctamente");
    }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado la cita",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

export {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
};
