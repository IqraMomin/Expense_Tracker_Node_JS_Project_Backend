const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/signup",usersController.addUser);
router.post("/login",usersController.loginUser);
router.get("/premium/showLeaderBoard",usersController.getLeaderBoard);
router.post("/password/forgotpassword",usersController.resetPassword);

module.exports = router;

