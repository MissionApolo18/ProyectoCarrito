import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

export const mostrarLogin = (req, res) => {
    res.render("login");
};

export const registrarUsuario = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Se define el rol por defecto como "cliente"
        const rol = "cliente";

        // Crea el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            username,
            email,
            password,  // Asumiendo que estás encriptando la contraseña antes de guardar
            rol,
        });
        console.log("Usuario registrado:", nuevoUsuario);

        // Redirigir al login o página de éxito
        res.redirect('/login');
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error al registrar usuario");
    }
};


export const autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).send("Usuario no encontrado");
        }

        const contraseñaCorrecta = await bcrypt.compare(password, usuario.password);
        if (!contraseñaCorrecta) {
            return res.status(401).send("Contraseña incorrecta");
        }

        res.send("Inicio de sesión exitoso");
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

