const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('vendedor', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Otros campos del vendedor (ciudad, país, etc.)
  })
}
