import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";

const router = Router ()

router.post('/', auth, createAppointment)
router.get ('/', getAppointments)
router.put ('/', updateAppointment)
router.delete ('/', deleteAppointment)

export {router}