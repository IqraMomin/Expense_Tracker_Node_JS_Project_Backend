const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-conection");

const ForgotPasswordRequests = sequelize.define("ForgotPasswordRequests",{
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
})

module.exports = ForgotPasswordRequests;