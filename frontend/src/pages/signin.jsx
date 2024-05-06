import React from "react";
import { Grid, Typography } from "@mui/material";
import Girl1 from "../assets/images/Girl_2.png";
import "../css/signin.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { Button } from "@mui/material";

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
  return (
    <>
      <div className="p-5" style={{ height: "100vh" }}>
        <Grid container className="main-box">
          <Grid
            item
            xs={6}
            className="d-flex align-items-center justify-content-center p-4"
          >
            <div className="hero-image-container">
              <img className="hero-image" src={Girl1} alt="Your Image" />
            </div>
          </Grid>
          <Grid item xs={6} className="p-4">
            <Typography variant="h4">Sign in</Typography>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values) => {
                console.log(values);
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
                <InputField name="password" label="Password" />
                <div className="m-3"></div>
                <InputField name="mobileNumber" label="Mobile number" />
                <div className="m-3"></div>
                <Button type="submit" variant="contained" color="primary">
                  Signin
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SignIn;
