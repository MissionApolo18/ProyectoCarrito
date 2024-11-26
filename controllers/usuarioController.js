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
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crea el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            username,
            email,
            password: hashedPassword,  // Asumiendo que estás encriptando la contraseña antes de guardar
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

export const iniciarSesion = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por su nombre de usuario
        const usuario = await Usuario.findOne({
            where: { username }
        });

        // Si el usuario no existe
        if (!usuario) {
            return res.status(400).send('Usuario o contraseña incorrectos');
        }

        // Comparar la contraseña ingresada con la contraseña cifrada en la base de datos
        const esContraseñaValida = await bcrypt.compare(password, usuario.password);

        // Si la contraseña es incorrecta
        if (!esContraseñaValida) {
            return res.status(400).send('Usuario o contraseña incorrectos');
        }

        // Si la contraseña es correcta, iniciar sesión (podrías redirigir al usuario o usar sesiones)
        res.redirect('/');  // Redirigir a la página principal o cualquier otra página
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
}; 