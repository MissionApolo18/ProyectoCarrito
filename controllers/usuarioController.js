import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

// Mostrar formulario de login
export const mostrarLogin = (req, res) => {
    res.render("login");
};

// Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const rol = "cliente"; // Rol por defecto
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            username,
            email,
            password: hashedPassword,
            rol,
        });
        console.log("Usuario registrado:", nuevoUsuario);

        res.redirect("/login"); // Redirigir al formulario de login
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error al registrar usuario");
    }
};

// Iniciar sesión y mantener la sesión activa
export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).send("Usuario o contraseña incorrectos");
        }
        const esContraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!esContraseñaValida) {
            return res.status(400).send("Usuario o contraseña incorrectos");
        }

        // Establecer la sesión
        req.session.user = { id: usuario.id, username: usuario.username, rol: usuario.rol };

        console.log("Sesión iniciada para el usuario:", usuario.username);
        res.redirect("/"); // Redirigir al inicio
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error al iniciar sesión");
    }
};

// Cerrar sesión
export const cerrarSesion = (req, res) => {
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }

        // Redirigir al login
        res.redirect("/login");
    });
};

// Middleware para verificar la sesión
export const verificarSesion = (req, res, next) => {
    if (req.session && req.session.user) {
        console.log("Usuario autenticado:", req.session.user.username);
        res.render("/")
    }

    console.log("Usuario no autenticado");
    res.redirect("/login");
};
