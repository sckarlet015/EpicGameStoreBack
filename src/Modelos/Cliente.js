const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

const Cliente = sequelize.define('cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Otros campos del cliente (dirección, número de teléfono, etc.)
});

module.exports = Cliente;
