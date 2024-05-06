import React from "react";
import { Grid, Typography } from "@mui/material";
import Girl1 from "../assets/images/Girl_2.png";
import "../css/signin.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();

  // FORMIK
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };
  // YUP
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Required!"),
    password: Yup.string().required("Required!"),
  });

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
            <Typography variant="h4">Login</Typography>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values) => {
                axios
                  .post("http://localhost:8000/ms-auth/user/login", {
                    data: values,
                  })
                  .then((res) => {
                    localStorage.setItem("ds-token", res.data.data.token);
                    console.log(res.data.message);
                    Navigate("/dashboard");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Form style={{ width: "70%" }}>
                <div className="m-5"></div>
                <InputField name="email" label="Email" />
                <div className="m-3"></div>
                <InputField name="password" label="Password" />
                <div className="m-5"></div>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
