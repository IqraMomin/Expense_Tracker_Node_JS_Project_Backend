const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("./routes/userRoutes");
const userModel = require("./models/users");
const db = require("./utils/db-conection");

app.use(express.json());

app.use("/users",userRoutes);

db.sync({force:false}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Up and Running on port http://localhost:${port}`)
    })
})
