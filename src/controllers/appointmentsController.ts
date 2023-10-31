import { Request, Response } from "express";

const createAppointment = (req: Request, res: Response) => {
    return res.send("Se ha creado la cita")
}

const getAppointments = (req: Request, res: Response) => {
    return res.send("Información de todas las citas")
}

const updateAppointment = (req: Request, res: Response) => {
    return res.send("Se ha actualizado la cita")
}

const deleteAppointment = (req: Request, res: Response) => {
    return res.send("Se ha eliminado la cita")
}

export{
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
}