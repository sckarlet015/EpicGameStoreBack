const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

const Vendedor = sequelize.define('vendedor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Otros campos del vendedor (ciudad, país, etc.)
});

module.exports = Vendedor;
