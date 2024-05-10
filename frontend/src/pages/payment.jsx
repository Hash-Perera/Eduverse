import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PDXWi05ad56a1pkkN5YcyjchfMdlOVbc2BmZGHxTYJDTlMBPgxcq6uihYVGcqZzTlYyKiHVua2BhUT0212nwBos00Nx0HqxBF');

const App = () => {
  const fetchClientSecret = useCallback(async () => {
    try{
        const response = await axios.post('http://localhost:8005/ms-payment/payment/create-session');
        if (response.status === 200){
            return response.data.clientSecret;
        }else{
            console.log("Error in fetching the client");
        }
    }catch(error){
        console.log("Error in getting the sessoin ", error);
    }
    
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}