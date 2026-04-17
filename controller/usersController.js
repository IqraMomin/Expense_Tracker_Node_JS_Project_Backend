const Users = require("../models/users");

const addUser = async(req,res)=>{
    try{
        const existingUser = await Users.findOne({
            where:{
                email:req.body.email
            }
        })
        if(existingUser){
            return res.status(400).json({message:"Email Already exists"})
        }
        const user = await Users.create(req.body);
        return res.status(201).json(user);
    }
    catch(err){
        if(err.name==="SequelizeUniqueConstraintError"){
            return res.status(400).json({message:"Email Already Exists"});
        }
        res.status(500).json({message:"Something went wrong"});
    }
   

}

module.exports = {addUser}