import express from "express";
import {
    obtenerJuegosPorConsola
} from "../controllers/juegosController.js"; // Importar el controlador

const router = express.Router();

// Ruta principal (Home)
router.get("/", (req, res) => {
    res.render("index", { plataforma: "", games: [] }); // Vista principal con plataforma vacía inicialmente
});

router.get("/carrito", (req, res) => {
    // Asegúrate de que req.session existe y contiene el carrito
    if (!req.session) req.session = {};
    if (!req.session.carrito) req.session.carrito = [];
  
    // Ahora puedes trabajar con req.session.carrito
    res.status(200).json(req.session.carrito);
  });
  
// Ruta para cargar juegos según la plataforma seleccionada
router.get("/juegos/:plataforma", obtenerJuegosPorConsola);
//router.post("/carrito", actualizarCarrito);
//router.delete("/carrito", eliminarJuegoDelCarrito)

export default router;
