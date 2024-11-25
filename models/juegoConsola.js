import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const JuegoConsola = db.define(
  'juegoConsola',
  {
    id_consola: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_juego: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precio_real: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    precio_usuario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'juegoConsola',
    timestamps: false,
    primaryKey: false,
  }
);

JuegoConsola.removeAttribute('id');
JuegoConsola.primaryKeyAttributes = ['id_consola','id_juego']

export default JuegoConsola;
