import { Grid, Typography } from "@mui/material";
import PrimaryAppBar from "../components/header";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// YUP
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
  mobileNumber: Yup.string().required("Required!"),
});

const Profile = () => {
  const Navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [isDiabled, setIsDisabled] = useState(true);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const newToken = localStorage.getItem("ds-token");
    axios
      .get("http://localhost:8000/ms-auth/user/details", {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDetails(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetPassword = async () => {
    const newToken = localStorage.getItem("ds-token");
    axios
      .get("http://localhost:8000/ms-auth/user/send-otp", {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        Navigate("/reset-password");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PrimaryAppBar />

      <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
        <Grid container className="main-box">
          <Grid
            item
            xs={12}
            className="d-flex align-items-center justify-content-center p-4"
          >
            <h2>Profile</h2>
          </Grid>
          {!loading && (
            <Grid item xs={12} className="p-4">
              <Typography variant="h4">Sign in</Typography>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  firstName: details.firstName,
                  lastName: details.lastName,
                  email: details.email,
                  password: details.password,
                  mobileNumber: details.mobileNumber,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={async (values) => {
                  const newObject = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    mobileNumber: values.mobileNumber,
                  };
                  const newToken = localStorage.getItem("ds-token");
                  axios
                    .put(
                      "http://localhost:8000/ms-auth/user/update",
                      newObject,
                      {
                        headers: {
                          Authorization: `Bearer ${newToken}`,
                        },
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      toast.success("Profile Updated!");
                      getDetails();
                      setIsDisabled(true);
                      Navigate("/dashboard");
                    })
                    .catch((err) => {
                      toast.error("Unable to update!");
                      console.log(err);
                    });
                }}
              >
                <Form style={{ width: "100%" }}>
                  <div className="m-5"></div>
                  <InputField
                    name="firstName"
                    label="First name"
                    disabled={isDiabled}
                  />
                  <div className="m-3"></div>
                  <InputField
                    name="lastName"
                    label="Last name"
                    disabled={isDiabled}
                  />
                  <div className="m-3"></div>
                  <InputField name="email" label="Email" disabled={isDiabled} />
                  <div className="m-3"></div>
                  <InputField
                    name="password"
                    label="Password"
                    disabled={true}
                  />
                  <div className="m-3"></div>
                  <InputField
                    name="mobileNumber"
                    label="Mobile number"
                    disabled={isDiabled}
                  />
                  <div className="m-3"></div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2 }}
                    onClick={() => resetPassword()}
                  >
                    Reset Password
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isDiabled}
                    onClick={() => setIsDisabled(false)}
                    sx={{ marginRight: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isDiabled}
                  >
                    Save
                  </Button>
                </Form>
              </Formik>
            </Grid>
          )}
        </Grid>
      </div>
      <Toaster />
    </>
  );
};

export default Profile;
