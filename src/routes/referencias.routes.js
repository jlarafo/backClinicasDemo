import { Router } from "express";
import {
  createReferencia,
  deleteReferencias,
  getReferencia,
  getReferencias,
  updateReferencia,
} from "../controllers/referencias.controller.js";

const router = Router();

// GET all referencias
router.get("/referencias", getReferencias);

// GET An referencias
router.get("/referencias/:id", getReferencia);

// DELETE An referencias
router.delete("/referencias/:id", deleteReferencias);

// INSERT An referencias
router.post("/referencias", createReferencia);

router.patch("/referencias/:id", updateReferencia);

export default router;
