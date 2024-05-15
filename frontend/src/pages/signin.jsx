import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Girl1 from "../assets/images/Girl_2.png";
import "../css/signin.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Logo1 from "../assets/images/Logo1.png";

// FORMIK
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobileNumber: "",
};
// YUP
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
  mobileNumber: Yup.string().required("Required!"),
});

const SignIn = () => {
  const Navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 2,
            type: "tween",
            ease: "backOut",
          },
          y: 0,
        }}
        viewport={{ once: true }}
      >
        <div className="p-5" style={{ height: "100vh" }}>
          <Grid container className="main-box" flexGrow={1}>
            <Grid
              item
              xs={6}
              className="p-4 d-flex align-items-center justify-content-center"
            >
              <div className="hero-image-container">
                <img className="hero-image" src={Girl1} alt="Your Image" />
              </div>
            </Grid>
            <Grid item xs={6} className="p-4">
              <div className="flex justify-start">
                <img src={Logo1} alt="Your Image" style={{ height: "6rem" }} />
              </div>
              <Typography variant="h4">Sign in</Typography>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={async (values) => {
                  axios
                    .post("http://localhost:8000/ms-auth/user/register", {
                      data: values,
                    })
                    .then(
                      (res) => {
                        toast.success("User Registered Successfully!");
                        Navigate("/login");
                      },
                      (err) => {
                        toast.error("User Registration Failed!");
                        console.log(err);
                      }
                    );
                }}
              >
                <Form style={{ width: "70%" }}>
                  <div className="m-5"></div>
                  <InputField name="firstName" label="First name" />
                  <div className="m-3"></div>
                  <InputField name="lastName" label="Last name" />
                  <div className="m-3"></div>
                  <InputField name="email" label="Email" />
                  <div className="m-3"></div>
                  <InputField
                    name="password"
                    type="password"
                    label="Password"
                  />
                  <div className="m-3"></div>
                  <InputField name="mobileNumber" label="Mobile number" />
                  <div className="m-3"></div>
                  <Button type="submit" variant="contained" color="secondary">
                    Sign in
                  </Button>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default SignIn;
