//Import the schema here


// const stripe = require('stripe')
import Stripe from 'stripe'


class PaymentService {

    async SubscribeEvents(payload) {
        payload = JSON.parse(payload);
    
        switch (payload.event) {
          case "CREATE_CHECKOUT":
            this.createCheckoutSession(payload);
            break;
          case "GET_SESSION":
            this.getCheckoutSession(payload);
            break;
          default:
            break;
        }
      }


    //Create checkout session

    async createCheckoutSession(payload,res){
        let item_price = 200.00;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        //creating session !!!!!!change the hardcoded data
        const session = await stripe.checkout.session.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                          name: 'Course',
                        },
                        unit_amount: 2000,
                      },
                      quantity: 1,
                },   
            ],

            mode: 'payment',
            return_url: `${BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        res.send({clientSecret: session.client_secret})
    }

    //Get Checkout session

    async getCheckoutSession(payload,res){
        const session = await Stripe.checkout.sessions.retrive(payload.session_id);

        res.send({
            status: session.status
        })
    }


}

module.exports = PaymentService;