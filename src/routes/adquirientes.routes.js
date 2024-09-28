import { Router } from "express";
import {
  createAdquiriente,
  deleteAdquirientes,
  getAdquiriente,
  getAdquirientes,
  updateAdquiriente,
} from "../controllers/adquirientes.controller.js";

const router = Router();

// GET all Pacientes
router.get("/pacientes", getAdquirientes);

// GET An Pacientes
router.get("/pacientes/:id", getAdquiriente);

// DELETE An Pacientes
router.delete("/pacientes/:id", deleteAdquirientes);

// INSERT An Pacientes
router.post("/pacientes", createAdquiriente);

router.patch("/pacientes/:id", updateAdquiriente);

export default router;
