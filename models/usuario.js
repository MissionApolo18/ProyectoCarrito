import { DataTypes } from 'sequelize';
import sequelize from './db.js';  // Asegúrate de importar la conexión
import { Hooks } from 'sequelize/lib/hooks';

const Usuario = sequelize.define('Usuario', {
  // Definir las columnas de la tabla
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
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
  timestamps: false,
});

export default Usuario;
