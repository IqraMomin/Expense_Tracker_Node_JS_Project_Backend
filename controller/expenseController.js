const { Users } = require("../models");
const Expense = require("../models/exepnse");
const sequelize = require("../utils/db-conection");
 

const addExpense = async(req,res)=>{
    try{
        const transaction = await sequelize.transaction();
        const expenses = {...req.body,UserId:req.user.id}
        const expense = await Expense.create(expenses,{transaction});
        if(expense){
            const user = await Users.findByPk(req.user.id);
            user.totalExpense = user.totalExpense+Number(req.body.amount);
            await user.save({transaction});
            await transaction.commit();
            return res.status(201).json({expense});
        }
    }catch(err){
        await transaction.rollback();
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

const deleteExpense = async (req, res) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const expenseId = req.params.id;

        const expense = await Expense.findOne({
            where: {
                id: expenseId,
                UserId: req.user.id
            },
            transaction
        });

        if (!expense) {
            await transaction.rollback();
            return res.status(404).json({ message: "Expense not found" });
        }

        const user = await Users.findByPk(req.user.id, { transaction });

        user.totalExpense -= expense.amount;
        await user.save({ transaction });

        await Expense.destroy({
            where: {
                id: expenseId,
                UserId: req.user.id
            },
            transaction
        });

        await transaction.commit();

        return res.status(200).json({ message: "Expense deleted successfully" });

    } catch (err) {
        if (transaction) await transaction.rollback();
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

module.exports = {addExpense,getAllExpenses,deleteExpense}