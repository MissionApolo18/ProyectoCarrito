import express from "express";
import { mostrarLogin, registrarUsuario, autenticarUsuario, iniciarSesion } from "../controllers/usuarioController.js";

const UsuarioRouter = express.Router();

// Ruta para mostrar el formulario de login
UsuarioRouter.get("/login", mostrarLogin);

// Ruta para mostrar el formulario de registro
UsuarioRouter.get("/registro", (req, res) => {
    res.render("registro"); // Renderiza la vista del formulario de registro
});

// Ruta para registrar un nuevo usuario
UsuarioRouter.post("/registro", registrarUsuario);

// Ruta para autenticar un usuario en el login
UsuarioRouter.post("/login", autenticarUsuario);

// Ruta alternativa para iniciar sesión con username y contraseña
UsuarioRouter.post("/iniciar-sesion", iniciarSesion);

export default UsuarioRouter;
