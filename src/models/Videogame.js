const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    launchDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {timestamps: false}
  );
};
