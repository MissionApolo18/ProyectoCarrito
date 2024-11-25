import { DataTypes } from "sequelize";
import db from "../config/db.js";
import EstadoJuegos from "./estadoJuegos.js";

const Carrito = db.define('Carrito', {
    id_carrito: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',  // Reemplaza 'usuarios' con el nombre correcto de tu tabla de usuarios
            key: 'id_usuario'   // Asegúrate de que este sea el nombre correcto de la columna clave primaria
        }
    },
    fechaPago: {
        type: DataTypes.INTEGER,
    },
    formato_pago: {
        type: DataTypes.INTEGER,
    },
    id_registroPago: {
        type: DataTypes.INTEGER,
        references: {
            model: 'registroPagos', // Asegúrate de usar el nombre correcto de la tabla de registroPago
            key: 'id_registroPago'  // Y el nombre correcto de la columna clave primaria
        }
    },
    total: {
        type: DataTypes.DECIMAL(5, 2)
    }
}, {
    timestamps: false,
});

export default Carrito;