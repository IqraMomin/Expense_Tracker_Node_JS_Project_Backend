const express =require('express');
const router = express.Router();
const passwordController = require("../controller/passwordController");

router.post("/forgotpassword",passwordController.forgotPassword);
router.get("/resetPassword/:id",passwordController.resetPassword);
router.get("/updatePassword/:id",passwordController.updatePassword);


module.exports = router;