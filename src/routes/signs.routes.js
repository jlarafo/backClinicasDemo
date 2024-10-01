
import { Router } from "express"; 
// const uploadImage = require('../controllers/archivos.controller.js');
import {
    uploadSign
  } from "../controllers/sign.controller.js";


const router = Router();

// Ruta para subir imagen
router.post('/subirFirma', uploadSign);

// module.exports = router;
export default router;

