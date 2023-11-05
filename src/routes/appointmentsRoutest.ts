import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentsByUserId, updateAppointment } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

// User y Admin: Crear una cita.
router.post('/', auth, createAppointment)

// SuperAdmin: Recuperar la información de TODAS las citas.
router.get ('/', auth, isSuperAdmin, getAllAppointments)
// Recuperar TODAS las citas de los usuarios.
router.get('/all', auth, getAppointmentsByUserId)
router.put ('/', updateAppointment)
router.delete ('/', deleteAppointment)

export {router}