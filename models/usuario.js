import { DataTypes } from 'sequelize';
import db from '../config/db.js'; 

const Usuario = db.define('Usuario', {
  // Definir las columnas de la tabla
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
}, {
  tableName: "usuario",
  timestamps: false,
});

export default Usuario;
