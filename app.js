const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const db = require("./utils/db-conection");
const cors = require('cors');
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const dotenv = require("dotenv").config();
const geminiRoutes = require("./routes/geminiRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
require("./models");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet")


const accessLog = fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"});
app.use(express.json());
app.use(cors());
app.use(morgan('combined',{stream:accessLog}));
app.use(helmet());


app.use("/pay",paymentRoutes)
app.use("/users",userRoutes);
app.use("/expenses",expenseRoutes);
app.use("/gemini",geminiRoutes);
app.use("/password",passwordRoutes);


db.sync({force:false}).then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is Up and Running...`)
    })
})
