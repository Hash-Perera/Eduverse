const PaymentService = require("../services/payment.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports =  (app,channel)=>{
    const service = new PaymentService();
    const baseUrl = "/payment";

    //To listen for the que
    SubscribeMessages(channel, service);

    app.post(`${baseUrl}/create-session`, async (req,res)=>{
        const result = await service.CreateCheckoutSession(req,res); 
        res.send(result);
    });

    app.get(`${baseUrl}/session-status`, async(req,res)=>{
        const result = await service.getCheckoutSession(req,res);
        res.send(result);
    });

    app.post(`${baseUrl}/create-entry`, async(req,res)=>{
        const result = await service.createTransactionEntry(req,res);
        res.send(result);
    })

    app.get(`${baseUrl}/get-transactions`, async(req,res)=>{
        const header = req.headers["authorization"];
        const token = header && header.split(" ")[1];
        
        const result = await service.getTransactionHistory(req.body,token);
        res.send(result);
    })

};