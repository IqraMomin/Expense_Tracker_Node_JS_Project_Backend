const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const userModel = require("./models/users");
const db = require("./utils/db-conection");
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/users",userRoutes);

db.sync({force:false}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Up and Running on port http://localhost:${port}`)
    })
})
