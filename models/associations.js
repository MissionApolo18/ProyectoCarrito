// models/associations.js
import Carrito from './carrito.js';
import EstadoJuegos from './estadoJuegos.js';
import Juego from './juego.js';
import Consola from './consola.js';
import JuegoConsola from './juegoConsola.js';

// Relaciones entre Carrito y EstadoJuegos
Carrito.hasMany(EstadoJuegos, { foreignKey: 'id_carrito' });
EstadoJuegos.belongsTo(Carrito, { foreignKey: 'id_carrito' });

// Relaciones entre EstadoJuegos y Juego
EstadoJuegos.belongsTo(Juego, { foreignKey: 'id_juego' });
Juego.hasMany(EstadoJuegos, { foreignKey: 'id_juego' });

// Asociación entre Consola y JuegoConsola
Consola.hasMany(JuegoConsola, { foreignKey: "id_consola" });
JuegoConsola.belongsTo(Consola, { foreignKey: "id_consola" });

// Asociación entre Juego y JuegoConsola
Juego.hasMany(JuegoConsola, { foreignKey: "id_juego" });
JuegoConsola.belongsTo(Juego, { foreignKey: "id_juego" });

export default function setupAssociations() {}
