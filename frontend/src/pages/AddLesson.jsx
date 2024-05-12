import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { motion } from "framer-motion";
import PrimaryAppBar from "../components/header";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddLesson = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
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
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("video", values.video);
      formData.append("duration", values.duration);
      formData.append("description", values.description);
      formData.append("course", id);
      formData.append("notes", file);

      console.log(formData);

      const response = await fetch("http://localhost:8002/lesson/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        toast.success("Lesson added successfully");
        window.location.href = `/course-page/${id}`;
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      toast.error("Failed to add lesson");
      alert(error);
    }
  };
  return (
    <>
      {" "}
      <PrimaryAppBar />
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
        className=" max-w-[1440px]  mx-auto px-4 py-[48px] md:py-[56px]"
      >
        <div role="presentation" className="px-5 ">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/all-dashboard">
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

          <div className="px-5 " style={{ height: "100vh", width: "80%" }}>
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
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Notes
                  <VisuallyHiddenInput
                    name="notes"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>

                <div className="m-3"></div>
                <Button variant="contained" color="primary" type="submit">
                  Add Lesson
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default AddLesson;
