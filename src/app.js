import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import adquirientesRoutes from "./routes/adquirientes.routes.js";
import historiasRoutes from "./routes/historias.routes.js";
import documentosRoutes from "./routes/documentos.routes.js";
import archivosRoutes from "./routes/odontogramas.routes.js";
import referenciasRoutes from "./routes/referencias.routes.js";
import signsRoutes from "./routes/signs.routes.js";
import cors from 'cors'; // Importar cors usando ES Modules
import bodyParser from "body-parser"; // Changed require to import

const app = express();

// Aumenta el límite del tamaño del cuerpo
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Configuración de CORS
const corsOptions = {
  //origin: 'http://localhost:3000', // Reemplazar con el origen de la aplicación
  origin: '*', // Permitir cualquier origen v1
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Usar cors con las opciones configuradas

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);

app.use("/api", adquirientesRoutes);
app.use("/api", historiasRoutes);
app.use("/api", documentosRoutes);
app.use("/api", archivosRoutes)
app.use("/api", signsRoutes)
app.use("/api", referenciasRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});


export default app;
