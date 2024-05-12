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
import AllCoursesAdmin from "./pages/AllCoursesAdmin";
import CourseDetails from "./pages/coursedetails";
import MyCourses from "./pages/mycourses";
import MyCourseDetails from "./pages/mycoursedetails";
import Payment from "./pages/payment";
import Successpage from "./pages/successpage";
import AddCourse from "./pages/AddCourse";
import AddLesson from "./pages/AddLesson";
import AllCourses from "./pages/AllCourses";
import CoursePage from "./pages/CoursePage";
import UpdateCourse from "./pages/UpdateCourse";
import PaymentHistory from "./pages/PaymentHistory";
import ResetPasswordLogout from "./pages/rest-logoutpage";
import { Toaster } from "react-hot-toast";

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
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/add-lesson/:id" element={<AddLesson />} />
          <Route path="/all-dashboard" element={<AllCoursesAdmin />} />
          <Route path="/course-page/:id" element={<CoursePage />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/mycourse/:id" element={<MyCourseDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Successpage />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/reset-password/:id" element={<ResetPasswordLogout />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
