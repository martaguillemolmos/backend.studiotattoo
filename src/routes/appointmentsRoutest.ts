import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from "../controllers/appointmentsController";

const router = Router ()

router.post('/', createAppointment)
router.get ('/', getAppointments)
router.put ('/', updateAppointment)
router.delete ('/', deleteAppointment)

export {router}