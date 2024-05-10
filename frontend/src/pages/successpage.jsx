import React from 'react'
import PrimaryAppBar from '../components/header';
import axios from "axios";

export default function successpage() {
    const [status, setStatus] = useState(null);
    // const [customerEmail, setCustomerEmail] = useState('');
  
    useEffect(() => {
     const newToken =  localStorage.getItem("ds-token");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      try{

      }catch(error){
        console.log("Error in getting session status", error);
      }
      
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/payment" />
      )
    }
  
    if (status === 'complete') {
      return (
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      )
    }
}
