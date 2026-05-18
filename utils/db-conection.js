require("dotenv").config();
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME,'root',process.env.DATABASE_PASSWORD,{
    host:process.env.DB_HOST,dialect:"mysql"
});

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection Created",process.env.DB_HOST);
    }
    catch(err){
        console.log(err);
    }
    
})();

module.exports = sequelize;