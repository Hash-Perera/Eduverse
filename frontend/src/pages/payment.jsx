import * as React from 'react';
import { useCallback } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from "axios";
import "../css/payment.css"
import PrimaryAppBar from '../components/header';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PDXWi05ad56a1pkkN5YcyjchfMdlOVbc2BmZGHxTYJDTlMBPgxcq6uihYVGcqZzTlYyKiHVua2BhUT0212nwBos00Nx0HqxBF');

export default function payment() {
  const courseData = {
    _id: "12346637bda70e17790dc64c9f1d",
    name: "Data Structures",
    description: "Learn Data Structures from scratch",
    price: 2000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNP5PYOUreMixh2t437ZZZ25RhKPjJ4egyKQ&s",
  }
  const fetchClientSecret = useCallback(async () => {
    const newToken = await localStorage.getItem("ds-token");
    try{
        const response = await axios.post('http://localhost:8000/ms-payment/payment/create-session',courseData,{headers:{Authorization:`Bearer ${newToken}`,},});
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
    <div>
      <PrimaryAppBar/>
        <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout/>
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
