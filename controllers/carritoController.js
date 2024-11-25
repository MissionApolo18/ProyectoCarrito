import Carrito from "../models/carrito.js";
import EstadoJuegos from "../models/estadoJuegos.js";

const carritoController = {
  // Crear un nuevo carrito para el usuario
  crearCarrito: async (req, res) => {
    try {
      const { id_usuario } = req.body;

      const nuevoCarrito = await Carrito.create({
        id_usuario,
        fechaPago: null, // Inicialmente sin pago
        formato_pago: null,
        id_registroPago: null,
        total: 0,
      });

      res.status(201).json({
        message: "Carrito creado exitosamente",
        carrito: nuevoCarrito,
      });
    } catch (error) {
      console.error("Error al crear carrito:", error);
      res.status(500).json({ message: "Error al crear carrito" });
    }
  },

  // Agregar un juego al carrito
  agregarAlCarrito: async (req, res) => {
    try {
      const { id_carrito, id_juego, cantidad } = req.body;

      // Verificar si ya existe ese juego en el carrito
      const juegoExistente = await EstadoJuegos.findOne({
        where: { id_carrito, id_juego },
      });

      if (juegoExistente) {
        // Actualizar la cantidad si el juego ya está en el carrito
        juegoExistente.cantidad += cantidad;
        await juegoExistente.save();
      } else {
        // Agregar un nuevo juego al carrito
        await EstadoJuegos.create({ id_carrito, id_juego, cantidad });
      }

      res.status(200).json({ message: "Juego agregado al carrito exitosamente" });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).json({ message: "Error al agregar al carrito" });
    }
  },

  // Ver el contenido del carrito
  verCarrito: async (req, res) => {
    try {
      const { id_carrito } = req.params;

      const juegosEnCarrito = await EstadoJuegos.findAll({
        where: { id_carrito },
        attributes: ["id_juego", "cantidad"],
      });

      res.status(200).json({ carrito: juegosEnCarrito });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).json({ message: "Error al obtener el carrito" });
    }
  },

  // Eliminar un juego del carrito
  eliminarDelCarrito: async (req, res) => {
    try {
      const { id_carrito, id_juego } = req.body;

      await EstadoJuegos.destroy({
        where: { id_carrito, id_juego },
      });

      res.status(200).json({ message: "Juego eliminado del carrito exitosamente" });
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      res.status(500).json({ message: "Error al eliminar del carrito" });
    }
  },

  // Finalizar la compra
  finalizarCompra: async (req, res) => {
    try {
      const { id_carrito, formato_pago, total, id_registroPago } = req.body;

      const carrito = await Carrito.findOne({ where: { id_carrito } });

      if (!carrito) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }

      // Actualizar datos del carrito
      carrito.fechaPago = new Date();
      carrito.formato_pago = formato_pago;
      carrito.total = total;
      carrito.id_registroPago = id_registroPago;
      await carrito.save();

      res.status(200).json({ message: "Compra finalizada exitosamente" });
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      res.status(500).json({ message: "Error al finalizar la compra" });
    }
  },
};

export default carritoController;


app.post('/agregar-al-carrito', (req, res) => {
  const { id_juego, cantidad } = req.body;

  // Verifica si el carrito ya existe en la sesión
  if (!req.session.carrito) {
    req.session.carrito = [];  // Si no existe, inicializa el carrito
  }

  // Verifica si el producto ya está en el carrito
  const productoExistente = req.session.carrito.find(item => item.id_juego === id_juego);

  if (productoExistente) {
    // Si ya existe, solo se aumenta la cantidad
    productoExistente.cantidad += cantidad;
  } else {
    // Si no existe, agrega el producto al carrito
    req.session.carrito.push({ id_juego, cantidad });
  }

  // Retorna el carrito actualizado
  res.json(req.session.carrito);
});
