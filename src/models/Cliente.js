const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cliente', {
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
  })
}
