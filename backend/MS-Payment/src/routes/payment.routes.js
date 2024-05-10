const PaymentService = require("../services/payment.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports =  (app,channel)=>{
    const service = new PaymentService();
    const baseUrl = "/payment";

    //To listen for the que
    SubscribeMessages(channel, service);

    app.post(`${baseUrl}/create-session`, async (req,res)=>{
        const result = await service.createCheckoutSession(req.body,res);
        res.send(result);
    });

    app.get(`${baseUrl}/session-status`, async(req,res)=>{
        const result = await service.getCheckoutSession(req.body,res);
        res.send(result);
    });

};