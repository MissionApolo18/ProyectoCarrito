// Importaciones
import express from "express";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import setupAssociations from "./models/associations.js";
import router from "./routes/inicio_router.js";
import { iniciarSesion, verificarSesion } from "./controllers/usuarioController.js";
import { obtenerJuegosPorConsola } from "./controllers/juegosController.js";

// Variables y configuración inicial
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
setupAssociations();

// Middleware para formularios y cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware para manejo de sesiones
app.use(
    session({
        secret: "clave-secreta", // Cambiar por una clave segura
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 día
    })
);

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");
} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}

// Configuración del motor de vistas
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Rutas principales
app.get("/", (req, res) => {
    res.render("index"); // Página de inicio
});

app.get("/juegos/:plataforma", obtenerJuegosPorConsola); // Juegos por plataforma

// Ruta protegida: perfil
app.get("/perfil", verificarSesion, (req, res) => {
    res.render("perfil", { username: req.session.user?.username });
});


// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Uso de routers adicionales
app.use("/", router); // Rutas iniciales
app.get("/U", iniciarSesion); // Rutas relacionadas con usuarios

// Puerto de la aplicación
const PORT = 2828;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
