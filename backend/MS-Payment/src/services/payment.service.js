//Import the schema here


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class PaymentService {

    async SubscribeEvents(payload) {
        payload = JSON.parse(payload);
    
        switch (payload.event) {
          case "CREATE_CHECKOUT":
            this.CreateCheckoutSession(payload);
            break;
          case "GET_SESSION":
            this.getCheckoutSession(payload);
            break;
          default:
            break;
        }
      }


    //Create checkout session

    async CreateCheckoutSession(payload,res){

        //creating session
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price_data: {
                        currency: 'lkr',
                        product_data: {
                          name: payload.title,
                          description:payload.description,
                          images:[payload.imageUrl]
                        },
                        unit_amount: payload.price * 100,
                      },
                      quantity: 1,
                },   
            ],

            mode: 'payment',
            return_url: `http://localhost:5173/succsess?session_id={CHECKOUT_SESSION_ID}`,
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