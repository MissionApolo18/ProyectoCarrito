import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Consola = db.define('Consola', {
  id_consola: {
      type: DataTypes.INTEGER, // Cambiado de Sequelize.INTEGER a DataTypes.INTEGER
      primaryKey: true,
      allowNull: false,
  },
  precio: {
      type: DataTypes.DECIMAL(5, 2), // Cambiado de Sequelize.DECIMAL a DataTypes.DECIMAL
  },
  nombre: {
      type: DataTypes.STRING, // Cambiado de Sequelize.STRING a DataTypes.STRING
  }
}, {
  tableName: "consola",
  timestamps: false,
});

export default Consola;
