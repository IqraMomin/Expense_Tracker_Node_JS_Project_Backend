const express = require('express');
const router = express.Router();
const {getPaymentStatus,processPayment} = require('../controller/paymentController');
const authenticate = require('../middleware/auth');

router.post("/",authenticate.authenticate,processPayment);
router.get("/payment-status/:orderId",getPaymentStatus);

module.exports = router;