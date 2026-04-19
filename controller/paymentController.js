const { Orders } = require("../models");
const { createOrder,getPaymentStatus:fetchStatus } = require("../services/cashfreeService");



const processPayment = async (req, res) => {
    const orderId = "OrderId-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerId = "1";
    const customerPhone = "9809876543";
    try {
        const paymentSessionId = await createOrder(orderId, orderAmount, orderCurrency, customerId, customerPhone);
        await Orders.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus: "Pending"
        });
        res.json({paymentSessionId,orderId});

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getPaymentStatus = async (req, res) => {
    try{
        const {orderId} = req.params;
        const status = await fetchStatus(orderId);
        await Orders.update({paymentStatus:status},
            {where:{orderId}});
        res.json({status});


    }catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }

}

module.exports = {  getPaymentStatus, processPayment }