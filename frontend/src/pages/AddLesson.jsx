import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { styled } from "@mui/material/styles";
import PrimaryAppBar from "../components/header";

const AddLesson = () => {
  const [course, setCourseId] = useState("663d09e38029e0ac250a0edc");
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem("ds-token");

      if (token) {
        try {
          setUserToken(token);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("No token found in local storage");
      }
    };
    getTokenFromLocalStorage();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const body = {
        ...values,
        course,
      };

      console.log("body", body);

      const response = await fetch(
        "http://localhost:8000/ms-course/lesson/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        alert("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {" "}
      <PrimaryAppBar />
      <div role="presentation" className=" px-5">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            My Courses
          </Link>

          <Link
            underline="hover"
            color="text.primary"
            href="/add-course"
            aria-current="page"
          >
            Add Lessons
          </Link>
        </Breadcrumbs>

        <Typography variant="h4" className="p-2">
          Add Lesson
        </Typography>

        <div className="px-5 " style={{ height: "100vh", width: "60%" }}>
          <Formik
            initialValues={{
              title: "",
              video: "",
              duration: "",
              description: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form style={{ width: "70%" }}>
              <div className="m-5"></div>
              <InputField name="title" label="Lesson Title" />
              <div className="m-3"></div>

              <InputField name="duration" label="Lesson Duration" />
              <div className="m-3"></div>
              <InputField name="video" label="Lesson Video" />
              <div className="m-3"></div>
              <InputField name="description" label="Lesson Description" />
              <div className="m-3"></div>

              <div className="m-3"></div>
              <Button variant="contained" color="primary" type="submit">
                Add Lesson
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddLesson;
