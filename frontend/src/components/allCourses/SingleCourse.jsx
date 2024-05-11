import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Chip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const SingleCourse = () => {
  const { id } = useParams();
  const role = localStorage.getItem("ds-role");

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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    setOpen(false);
    const newToken = localStorage.getItem("ds-token");
    const body = {
      id: id,
      status: "active",
    };
    try {
      const response = await axios.put(
        `http://localhost:8000/ms-course/course/status-update`,
        body,
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Course Approved Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        className=" max-w-[1440px]  mx-auto px-4 py-[48px] md:py-[96px]"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/all-dashboard">
            All Courses
          </Link>
          <Link underline="hover" color="inherit" href={`/courses/${id}`}>
            {course?.name}
          </Link>
        </Breadcrumbs>
        <h1 className="text-4xl font-bold text-center mb-8">
          {" "}
          {course.title}{" "}
        </h1>
        <div className="max-w-[1200px] mx-auto  ">
          <div className="flex md:flex-row flex-col">
            <img
              src={`/images/${course.image}`}
              alt={course.title}
              className="w-full h-full object-contain  "
            />
            <div className=" flex flex-col">
              <h2 className="text-3xl font-bold mb-4"> {course.title} </h2>
              <p className="text-lg mb-4"> {course.description} </p>
              <p className="text-lg mb-4">Price : {course.price} </p>
              <p className="text-lg mb-4"> Duration : {course.duration} </p>
              <p className="text-lg mb-4">
                {" "}
                Course Category : {course.category}{" "}
              </p>
              <p className="text-lg mb-4"> Language : {"English"} </p>

              {role === "Admin" || role === "Instructor" ? (
                <Chip
                  color={course?.status === "pending" ? "error" : "success"}
                  label={course?.status}
                  className=" w-min"
                />
              ) : null}

              {course?.status === "pending" ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className=" mt-3"
                  onClick={handleOpen}
                >
                  Approve
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            Are you sure you want to apporve this course
          </h2>
          <div className=" flex justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className=" mt-3"
              onClick={handleApprove}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              className=" mt-3"
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SingleCourse;
