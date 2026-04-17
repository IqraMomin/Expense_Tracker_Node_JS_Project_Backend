const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("./routes/userRoutes");
const userModel = require("./models/users");

app.use("/users",userRoutes);

app.listen(port,()=>{
    console.log(`Server is Up and Running on port http://localhost:${port}`)
})