const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    
  },
  {timestamps: false}
  );
};
