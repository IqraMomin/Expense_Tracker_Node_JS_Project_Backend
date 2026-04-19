const express = require('express');
const router = express.Router();
const {getPaymentStatus,processPayment} = require('../controller/paymentController');

router.post("/",processPayment);
router.get("/payment-status/:orderId",getPaymentStatus);

module.exports = router;