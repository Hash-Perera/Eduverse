import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import PrimaryAppBar from "../components/header";
import { Grid, Typography } from "@mui/material";
import InputField from "../components/form-ui/inputfield";
import { Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// FORMIK
const INITIAL_FORM_STATE = {
  newPassword: "",
  confirmPassword: "",
  otp: "",
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  newPassword: Yup.string().required("Required!"),
  confirmPassword: Yup.string().required("Required!"),
  otp: Yup.string().required("Required!"),
});

const ResetPassword = () => {
  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <PrimaryAppBar />
      <div style={{ paddingLeft: "30%", paddingRight: "30%" }}>
        <Grid container className="main-box">
          <Grid
            item
            xs={12}
            className="p-4 d-flex align-items-center justify-content-center"
          >
            <h2>Reset Password</h2>
          </Grid>

          <Grid item xs={12} className="p-4">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values) => {
                console.log(values);
                const newToken = localStorage.getItem("ds-token");
                axios
                  .post(
                    "http://localhost:8000/ms-auth/user/reset-password",
                    values,
                    {
                      headers: {
                        Authorization: `Bearer ${newToken}`,
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                      toast.success("Password Reset Successfully!");
                      localStorage.removeItem("ds-token");
                      localStorage.removeItem("ds-role");
                      Navigate("/login");
                    } else {
                      toast.error(res.data.message);
                      setError(res.data.message);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Form
                style={{
                  width: "100%",
                  paddingLeft: "20%",
                  paddingRight: "20%",
                }}
              >
                <div className="m-5"></div>
                <InputField name="newPassword" label="New Password" />
                <div className="m-3"></div>
                <InputField name="confirmPassword" label="Confirm Password" />
                <div className="m-3"></div>
                <InputField name="otp" label="OTP" />
                <div className="m-3"></div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Reset Password
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPassword;
