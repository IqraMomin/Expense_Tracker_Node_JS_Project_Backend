const { Orders, Users } = require("../models");
const { createOrder,getPaymentStatus:fetchStatus } = require("../services/cashfreeService");



const processPayment = async (req, res) => {
    const UserId = req.user.id;
    const orderId = "OrderId-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerId = UserId.toString();
    const customerPhone = "9809876543";
    try {
        const paymentSessionId = await createOrder(orderId, orderAmount, orderCurrency, customerId, customerPhone);
        await Orders.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus: "Pending",
            UserId
        });
        res.json({paymentSessionId,orderId});

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getPaymentStatus = async (req, res) => {
    try{
        const {orderId} = req.params;
        const order = await Orders.findOne({where:{orderId}});
        const status = await fetchStatus(orderId);

        await Orders.update({paymentStatus:status},
            {where:{orderId}});
        
        if(status==="Success"){
            await Users.update({
                isPremium:true
            },{where:{id:order.UserId}})
        }
        return res.redirect("http://localhost:5173/welcome");


    }catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }

}

module.exports = {  getPaymentStatus, processPayment }