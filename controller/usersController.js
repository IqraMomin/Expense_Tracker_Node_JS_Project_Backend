const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Expense } = require("../models");
const { fn, col, Model } = require("sequelize");


const addUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const existingUser = await Users.findOne({
            where:{
                email:email
            }
        })
        if(existingUser){
            return res.status(400).json({message:"Email Already exists"})
        }
        const saltRounds =10;
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            if(err){
                throw new Error(err);
            }
        const user = await Users.create({name,email,password:hash});
        return res.status(201).json(user);
        })
        
    }
    catch(err){
        if(err.name==="SequelizeUniqueConstraintError"){
            return res.status(400).json({message:"Email Already Exists"});
        }
        res.status(500).json({message:"Something went wrong"});
    }   
}

const generateAccessToken = (id)=>{
    return jwt.sign({id},"secretKey");
}

const loginUser =async (req,res)=>{
    try{
        const existingUser =await Users.findOne({
            where:{
                email:req.body.email
            }
        })
        if(existingUser){
            bcrypt.compare(req.body.password,existingUser.password,(err,result)=>{
                if(err){
                    return res.status(500).json({message:err});
                }
                else if(result===true){   
                    console.log("User logged in")                
                    return res.status(200).json({token:generateAccessToken(existingUser.id),
                        "isPremium":existingUser.isPremium});
                }
                else{
                    return res.status(401).json({message:"User not authorized"});
                }

            })           
            
        }else{
            return res.status(404).json({message:"User Not Found"});
        }
        
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}
const getLeaderBoard = async (req, res) => {
    try {
        const board = await Users.findAll({
            attributes: [
                "id",
                "name",
                "totalExpense"
            ],            
            order: [["totalExpense", "DESC"]]
        });

        if (board.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        return res.status(200).json(board);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const resetPassword = async(req,res)=>{
    try{
        const {email}= req.body;

    }catch(err){
        return res.status(500).json({err:err.message});
    }

}

module.exports = {addUser,loginUser,getLeaderBoard}