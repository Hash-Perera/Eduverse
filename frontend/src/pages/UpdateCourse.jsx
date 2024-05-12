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
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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

const UpdateCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  useEffect(() => {
    const newToken = localStorage.getItem("ds-token");
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/ms-course/course/get-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseDetails();
  }, [id]);
  const [file, setFile] = useState(course?.image);

  const handleSubmit = async (values) => {
    const userToken = localStorage.getItem("ds-token");
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("duration", values.duration);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", file);

      const response = await fetch(
        "http://localhost:8002/course/details-update",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully");
        alert("Data submitted successfully");
        window.location.href = `/course/${id}`;
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
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
        <div role="presentation" className=" px-5">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={`/all-dashboard`}>
              All Courses
            </Link>
            <Link underline="hover" color="inherit" href={`/course/${id}`}>
              {course?.name}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/update-course/${id}`}
            >
              Update Course
            </Link>
          </Breadcrumbs>
          <Typography variant="h4" className="p-2">
            Update Course
          </Typography>
          {course?.name ? (
            <div className="px-5 " style={{ height: "100vh", width: "80%" }}>
              <Formik
                initialValues={{
                  name: course?.name,
                  price: course?.price,
                  duration: course?.duration,
                  instructor: course?.instructor,
                  description: course?.description,
                  category: course?.category,
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Form style={{ width: "70%" }}>
                  <div className="m-5"></div>
                  <InputField
                    name="name"
                    defaultValue={course?.name}
                    label="Course Name"
                  />
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update Course
                  </Button>
                </Form>
              </Formik>
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default UpdateCourse;
