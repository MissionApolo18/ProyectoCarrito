import express from "express";
import { obtenerJuegosPorConsola ,
    actualizarCarrito,
    eliminarJuegoDelCarrito
 } from "../controllers/juegosController.js"; // Importar el controlador

const router = express.Router();

// Ruta principal (Home)
router.get("/", (req, res) => {
    res.render("index", { plataforma: "", games: [] }); // Vista principal con plataforma vacía inicialmente
});

// Ruta para cargar juegos según la plataforma seleccionada
router.get("/juegos/:plataforma", obtenerJuegosPorConsola);
router.post("/carrito",actualizarCarrito);
router.delete("/carrito", eliminarJuegoDelCarrito)

export default router;
