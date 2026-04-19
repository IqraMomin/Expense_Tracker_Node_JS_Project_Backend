const Users = require("../models/users");
const Expense  = require("../models/exepnse");
const Orders = require("../models/Orders");


Users.hasMany(Expense);
Expense.belongsTo(Users);


module.exports = {Users,Expense,Orders}