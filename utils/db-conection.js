require("dotenv").config();
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME,'root',process.env.DATABASE_PASSWORD,{
    host:"localhost",dialect:"mysql"
});

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection Created");
    }
    catch(err){
        console.log(err);
    }
    
})();

module.exports = sequelize;