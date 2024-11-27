import express from "express";
import { 
    mostrarLogin, 
    registrarUsuario, 
    iniciarSesion, 
    cerrarSesion 
} from "../controllers/usuarioController.js";

const UsuarioRouter = express.Router();

// Ruta para mostrar el formulario de login
UsuarioRouter.get("/login", mostrarLogin);

// Ruta para mostrar el formulario de registro
UsuarioRouter.get("/registro", (req, res) => {
    res.render("registro"); // Renderiza la vista del formulario de registro
});

// Ruta para registrar un nuevo usuario
UsuarioRouter.post("/registro", registrarUsuario);

// Ruta para iniciar sesión
UsuarioRouter.post("/login", iniciarSesion);

// Ruta para cerrar sesión
UsuarioRouter.get("/logout", cerrarSesion);

export default UsuarioRouter;
