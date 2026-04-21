const Users = require("../models/users");
const Expense  = require("../models/exepnse");
const Orders = require("../models/Orders");
const ForgotPasswordRequests = require("../models/ForgotPasswordRequests");


Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(Users);




module.exports = {Users,Expense,Orders,ForgotPasswordRequests}