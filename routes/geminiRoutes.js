const express = require("express");
const router = express.Router();
const geminiController = require("../controller/geminiController");

router.post("/getCategories",geminiController.getCategoriesUsingAI);

module.exports = router;