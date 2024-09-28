import { Router } from "express";
import {
  createHistoria,
  deleteHistorias,
  getHistoria,
  getHistorias,
  updateHistoria,
} from "../controllers/historias.controller.js";

const router = Router();

// GET all historias
router.get("/historias", getHistorias);

// GET An historias
router.get("/historias/:id", getHistoria);

// DELETE An historias
router.delete("/historias/:id", deleteHistorias);

// INSERT An historias
router.post("/historias", createHistoria);

router.patch("/historias/:id", updateHistoria);

export default router;
