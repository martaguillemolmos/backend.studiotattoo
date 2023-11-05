import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentsByUserId, getAppointmentsByWorkerId, updateAppointment } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";

const router = Router ()

// User y Admin: Crear una cita.
router.post('/', auth, createAppointment)

// SuperAdmin: Recuperar la información de TODAS las citas.
router.get ('/', auth, isSuperAdmin, getAllAppointments)

//Usuario y Admin: Recuperar todas las citas del cliente.
router.get('/user', auth, getAppointmentsByUserId)

//Admin: Recuperar todas las citas del trabajador.
router.get('/worker', auth, getAppointmentsByWorkerId)


router.put ('/', updateAppointment)
router.delete ('/', deleteAppointment)

export {router}