const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-conection");

const Orders = sequelize.define('Orders',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    paymentSessionId:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    orderAmount:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    orderCurrency:{
        type:DataTypes.STRING,
        allowNull:false
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Orders;