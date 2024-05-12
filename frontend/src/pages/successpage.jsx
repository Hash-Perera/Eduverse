import React from 'react'
import { useEffect,useState } from "react";
import PrimaryAppBar from '../components/header';
import axios from "axios";

export default function successpage() {
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null)
  
    useEffect(() => {
     const newToken =  localStorage.getItem("ds-token");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      //function ti get the status of the session and set it to the states
      async function getStatus(){
        try{
            const response = await axios.get(`http://localhost:8000/ms-payment/payment/session-status?session_id=${sessionId}`,{headers: {Authorization: `Bearer ${newToken}`,},});
            
            if(response.status === 200){
                setStatus(response.data.status);
                setData(response.data);
            }else{
                console.log("Did not return any data",response);
            }

          }catch(error){
            console.log("Error in getting session status", error);
          }
      }

      
      //calling the function if only session id is returned in params
      if(urlParams.has('session_id')){
        getStatus();
      }else{
        window.location.href = '/dashboard'
      }
      
      
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/payment" />
      )
    }
  
    if (status === 'complete') {
      return (
        <>
        <PrimaryAppBar/>
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent {data.course_id}.
          </p>
        </section>
        </>
      )
    }


}
