
import { Router } from "express"; 
// const uploadImage = require('../controllers/archivos.controller.js');
import {
    uploadImage
  } from "../controllers/archivos.controller.js";


const router = Router();

// Ruta para subir imagen
router.post('/subirOdontograma', uploadImage);

// module.exports = router;
export default router;



