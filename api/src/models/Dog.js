const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
      require: true,

    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    age :{
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    }
  },{timestamps:false});
};
