const Users = require("../models/users");
const Expense  = require("../models/exepnse");


Users.hasMany(Expense);
Expense.belongsTo(Users);


module.exports = {Users,Expense}