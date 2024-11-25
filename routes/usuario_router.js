import express from "express";
import { mostrarLogin, registrarUsuario, autenticarUsuario } from "../controllers/usuarioController.js";

const UsuarioRouter = express.Router();

// Ruta para mostrar el formulario de login
UsuarioRouter.get("/login", mostrarLogin);

// Ruta para registrar un nuevo usuario
UsuarioRouter.post("/guardar-cliente", registrarUsuario);

// Ruta para autenticar un usuario
UsuarioRouter.post("/login", autenticarUsuario);

export default UsuarioRouter;
