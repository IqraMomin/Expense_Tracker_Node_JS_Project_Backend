const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');
const authenticate = require("../middleware/auth");


router.post("/",authenticate.authenticate,expenseController.addExpense);
router.get("/",authenticate.authenticate,expenseController.getAllExpenses);
router.delete("/:id",authenticate.authenticate,expenseController.deleteExpense);

module.exports = router;