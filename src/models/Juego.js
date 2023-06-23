const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('juego', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
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
    idAPI: {
      type: DataTypes.INTEGER,
      unique: 'unique_id'
    },
    requisitos: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    generos: {
      type: DataTypes.ARRAY,
      defaultValue: ['']
    },
    plataformas: {
      type: DataTypes.ARRAY,
      defaultValue: ['']
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY,
      defaultValue: ['']
    },
    putuación: {
      type: DataTypes.ARRAY,
      defaultValue: []
    }
  })
}

