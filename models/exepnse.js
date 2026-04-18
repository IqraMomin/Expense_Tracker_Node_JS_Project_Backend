const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-conection");

const Expense = sequelize.define("Expense",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Expense