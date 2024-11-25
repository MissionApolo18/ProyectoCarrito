// juego.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";
import JuegoConsola from "./juegoConsola.js";
import EstadoJuegos from "./estadoJuegos.js";

const Juego = db.define("juego", {
  id_juego: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  precio_usuario: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
}, {
  tableName: "juego",
  timestamps:false,
});

export default Juego;
