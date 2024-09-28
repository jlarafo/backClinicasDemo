import { Router } from "express";
import {
  createDocumento,
  deleteDocumentos,
  getDocumento,
  getDocumentos,
  updateDocumento,
} from "../controllers/documentos.controller.js";

const router = Router();

// GET all Documentos
router.get("/documentos", getDocumentos);

// GET An Documentos
router.get("/documentos/:id", getDocumento);

// DELETE An Documentos
router.delete("/documentos/:id", deleteDocumentos);

// INSERT An Documentos
router.post("/documentos", createDocumento);

router.patch("/documentos/:id", updateDocumento);

export default router;
