const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

const Juego = sequelize.define('juego', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Otros campos del juego (plataforma, género, etc.)
});

module.exports = Juego;
