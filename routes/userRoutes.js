const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/signup",usersController.addUser);
router.post("/login",usersController.loginUser);

module.exports = router;

