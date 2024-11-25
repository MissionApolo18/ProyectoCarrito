// Asegúrate de importar los modelos primero
import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Juego  from "./juego.js";

const EstadoJuegos = db.define('EstadoJuegos', {
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_juego: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "estadoJuegos",
    timestamps: false,
});

export default EstadoJuegos;

