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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
