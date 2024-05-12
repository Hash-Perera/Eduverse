import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PrimaryAppBar from "../components/header";
import Dropdown from "../components/form-ui/dropdown";
import { motion } from "framer-motion";
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

const AddCourse = () => {
  const [userToken, setUserToken] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Function to retrieve token from local storage
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem("ds-token");

      if (token) {
        try {
          setUserToken(token);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.error("No token found in local storage");
      }
    };
    getTokenFromLocalStorage();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("duration", values.duration);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", file);

      console.log(formData);

      const response = await fetch("http://localhost:8002/course/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        toast.success("Course added successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to add course");
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
              Courses
            </Link>

            <Link
              underline="hover"
              color="text.primary"
              href="/add-course"
              aria-current="page"
            >
              Add Course
            </Link>
          </Breadcrumbs>

          <Typography variant="h4" className="p-2">
            Add Course
          </Typography>

          <div className="px-5 " style={{ height: "100vh", width: "80%" }}>
            <Formik
              initialValues={{
                name: "",
                price: "",
                duration: "",
                instructor: "",
                description: "",
                category: "web",
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form style={{ width: "70%" }}>
                <div className="m-5"></div>
                <InputField name="name" label="Course Name" />
                <div className="m-3"></div>
                <InputField name="price" label="Course Price" />
                <div className="m-3"></div>
                <InputField name="duration" label="Course Duration" />
                <div className="m-3"></div>
                <InputField name="description" label="Course Description" />
                <div className="m-3"></div>
                <Dropdown
                  name="category"
                  label="Category"
                  options={{
                    "": "",
                    web: "Web Development",
                    mobile: "Mobile Development",
                    "data science": "Data Science",
                    ML: "Machine Learning",
                  }}
                />
                <div className="m-3"></div>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    name="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>
                <div className="m-3"></div>
                <Button variant="contained" color="primary" type="submit">
                  Add Course
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

export default AddCourse;
