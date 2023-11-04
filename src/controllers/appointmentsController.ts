import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

const createAppointment = async(req: Request, res: Response) => {
    try {
        //Lógica para crear una nueva cita
        const {worker_id, portfolio_id, day, hour, is_active } = req.body
        const newAppointment = await Appointment.create({
            worker_id,
            portfolio_id,
            day,
            hour,
            is_active
        }).save()
        return res.json (newAppointment)
    
        } catch (error) {
        console.log(error);
        return res.json({
          succes: false,
          message: "No se ha creado la cita",
          // esto lo utilizamos para que nos salte el tipo de error
          error: error,
        });
        }
}

const getAppointments = (req: Request, res: Response) => {
    // Lógica para recuperar todas la información de las citas
    try {
        const newAppointment = Appointment.find()
    return res.json(newAppointment)
    } catch (error) {
        console.log(error);
        return res.json({
          succes: false,
          message: "No se ha podido realizar la consulta",
          // esto lo utilizamos para que nos salte el tipo de error
          error: error,
        });
        }
    }


const updateAppointment = async(req: Request, res: Response) => {
    try {
        //Lógica para actualizar portfolio
            const appointmentId = req.params.id
            const {worker_id, portfolio_id, day, hour, is_active } = req.body
        
            await Appointment.update(
                {
                    id: parseInt(appointmentId),
                  },
                  {
                    worker_id,
                    portfolio_id,
                    day,
                    hour,
                    is_active
                  }
            )
          
            return res.json ("La cita ha sido actualizada con éxito")
        } catch (error) {
            console.log(error);
            return res.json({
              succes: false,
              message: "No se ha actualizado la cita",
              // esto lo utilizamos para que nos salte el tipo de error
              error: error,
            });
        }
}

const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentIdToDelete = req.params.id
        const appointmentToRemove = await Appointment.findOneBy (
            {
            id: parseInt(appointmentIdToDelete),
          }
          )
          
          if (!appointmentToRemove){
            return res.json("La cita que quieres eliminar no exste.")
          }
          const appointmentRemoved = await Appointment.remove(appointmentToRemove as Appointment);
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
}

export{
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
}