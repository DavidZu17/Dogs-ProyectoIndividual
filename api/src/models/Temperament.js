const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    //Se define el modelo y sus atributos de temperament
    sequelize.define('temperament' , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement :true 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            require: true
        }
    },{timestamps:false})
}