// Importaciones
import express from "express";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { juegosInfo } from "./controllers/juegosController.js";
import router from "./routes/inicio_router.js"; // Importar el router principal
import setupAssociations from "./models/associations.js";
import { obtenerJuegosPorConsola } from "./controllers/juegosController.js";
import UsuarioRouter from "./routes/usuario_router.js";
import { registrarUsuario } from "./controllers/usuarioController.js";
// Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
setupAssociations();

//Configuración para formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuración de la base de datos
try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");
} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}

// Configuración de Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get('/', (req, res) => {
    res.render('index', {juegosInfo});
})
app.get("/juegos/:plataforma", obtenerJuegosPorConsola);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname,"public")));

// Uso de rutas
app.use("/", router);
app.use("/", UsuarioRouter);

// Puerto de la aplicación
const PORT = 2828;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

