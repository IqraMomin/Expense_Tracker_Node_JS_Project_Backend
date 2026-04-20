const { Users } = require("../models");
const Expense = require("../models/exepnse");

const addExpense = async(req,res)=>{
    try{
        const expenses = {...req.body,UserId:req.user.id}
        const expense = await Expense.create(expenses);
        if(expense){
            const user = await Users.findByPk(req.user.id);
            user.totalExpense = user.totalExpense+Number(req.body.amount);
            await user.save();
            return res.status(201).json({expense});
        }
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}

const getAllExpenses = async(req,res)=>{
    try{
        const expenses = await Expense.findAll({
            where:{
                UserId:req.user.id
            }
        });
        if(expenses){
            return res.status(200).json(expenses);
        }
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }

}

const deleteExpense = async(req,res)=>{
    try{
        const expenseId = req.params.id;
        const deleted = await Expense.destroy({
            where:{
                id:expenseId,
                UserId:req.user.id
            }
        })
        if (!deleted) {
            return res.status(404).json({ message: "Expense not found" });
          }
      
          return res.status(200).json({ message: "Expense deleted successfully" });
      
    }catch(err){
        return res.status(500).json({message:"Something Went Wrong"});
    }

}

module.exports = {addExpense,getAllExpenses,deleteExpense}