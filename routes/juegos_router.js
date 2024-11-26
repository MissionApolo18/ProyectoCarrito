import { agregarAlCarrito, obtenerCarrito } from "../controllers/juegosController.js";

const juegoRouter = express.Router();

juegoRouter.post("/carrito/agregar", agregarAlCarrito);
juegoRouter.get("/carrito", obtenerCarrito);

export default juegoRouter;