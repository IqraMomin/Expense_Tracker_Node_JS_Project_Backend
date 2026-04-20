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
require("./models");

app.use(express.json());
app.use(cors());

app.use("/pay",paymentRoutes)
app.use("/users",userRoutes);
app.use("/expenses",expenseRoutes);
app.use("/gemini",geminiRoutes);

db.sync({force:false}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Up and Running on port http://localhost:${port}`)
    })
})
