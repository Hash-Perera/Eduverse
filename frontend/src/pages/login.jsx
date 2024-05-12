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
import { motion } from "framer-motion";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import toast, { Toaster } from "react-hot-toast";
import Logo1 from "../assets/images/Logo1.png";


const Login = () => {
  const Navigate = useNavigate();

  const [resetPassword, setResetPassword] = useState(false);
  //!================================
  const INITIAL_FORM_STATE_RESET = {
    email: "",
  };
  const FORM_VALIDATION_RESET = Yup.object().shape({
    email: Yup.string().required("Required!"),
  });

  //!===============================
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
          <Grid container className="main-box">
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
              <div className="flex justify-start ml-10 ">
                <img src={Logo1} alt="Your Image" style={{ height: "15rem" }} />
              </div>
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
                      localStorage.setItem("ds-role", res.data.data.role);
                      console.log(res.data);
                      console.log(res.data.message);
                      toast.success("Login Successful!");
                      if (
                        res.data.data.role === "Admin" ||
                        res.data.data.role === "Instructor"
                      ) {
                        Navigate("/all-dashboard");
                      } else {
                        Navigate("/all-courses");
                      }
                    })
                    .catch((err) => {
                      console.log(err.response.data.message);
                    });
                }}
              >
                <Form style={{ width: "70%" }}>
                  <div className="m-5"></div>
                  <InputField name="email" label="Email" />
                  <div className="m-3"></div>
                  <InputField name="password" label="Password" />
                  <div className="m-5"></div>


                  <Stack spacing={2} direction="row">
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setResetPassword(!resetPassword);
                      }}
                    >
                      {resetPassword ? "Cancel" : "Reset Password"}
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </Stack>

                  <div className="flex gap-5 ">
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                    <Button
                      onClick={() => Navigate("/signin")}
                      variant="text"
                      color="primary"
                    >
                      Don't have an account?
                    </Button>
                  </div>

                </Form>
              </Formik>

              {resetPassword && (
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE_RESET }}
                  validationSchema={FORM_VALIDATION_RESET}
                  onSubmit={async (values) => {
                    console.log(values);
                    axios
                      .post(
                        "http://localhost:8000/ms-auth/user/send-otp-logout",
                        values
                      )
                      .then((res) => {
                        console.log(res.data);
                        console.log(res.data.success);
                        console.log(res.data.message);
                        console.log(res.data.data);
                        if (res.data.success) {
                          console.log("Navigating to reset password");
                          Navigate(`/reset-password/${res.data.data}`);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        console.log(err.response.data.message);
                      });
                  }}
                >
                  <Form style={{ width: "70%" }}>
                    <div className="m-5"></div>
                    <InputField name="email" label="Email" />
                    <div className="m-5"></div>
                    <Button type="submit" variant="contained" color="primary">
                      Send OTP
                    </Button>
                  </Form>
                </Formik>
              )}
            </Grid>
          </Grid>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default Login;
