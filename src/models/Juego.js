const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('juego', {
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
  })
}

