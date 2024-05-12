import { useState } from "react";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./pages/signin";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import ResetPassword from "./pages/reset-password";
import ViewNotifications from "./pages/view-notifications";
import Payment from "./pages/payment";
import Successpage from "./pages/successpage";
import AddCourse from "./pages/AddCourse";
import AddLesson from "./pages/AddLesson";
import PaymentHistory from "./pages/PaymentHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("ds-token") ? <Dashboard /> : <Home />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/view-notifications" element={<ViewNotifications />} />
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/success" element={<Successpage/>}/>
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/add-lesson" element={<AddLesson />} />
          <Route path="/payment-history" element={<PaymentHistory/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
