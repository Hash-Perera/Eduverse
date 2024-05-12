import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Chip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LanguageIcon from "@mui/icons-material/Language";
import toast, { Toaster } from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(true);

  //useEffect to settimeout for loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteLesson, setOpenDeleteLesson] = useState(false);
  const [lessonId, setLessonId] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenDeleteLesson = (id) => {
    setLessonId(id);
    setOpenDeleteLesson(true);
  };
  const handleCloseDeleteLesson = () => {
    setOpenDeleteLesson(false);
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
        toast.success("Course Approved Successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error Approving Course");
    }
  };

  const handleDelete = async () => {
    setOpenDelete(false);
    const newToken = localStorage.getItem("ds-token");
    try {
      const response = await axios.delete(
        `http://localhost:8000/ms-course/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Course Deleted Successfully");
        window.location.href = "/all-dashboard";
      }
    } catch (error) {
      toast.error("Error Deleting Course");
    }
  };

  const handleLessonDelete = async () => {
    setOpenDeleteLesson(false);
    const newToken = localStorage.getItem("ds-token");
    try {
      const response = await axios.delete(
        `http://localhost:8000/ms-course/lesson/delete/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Lesson Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error Deleting Lesson");
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
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
        className=" max-w-[1440px]  mx-auto px-4 py-[48px] md:py-[56px]"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/dashboard">
            All Courses
          </Link>
          <Link underline="hover" color="inherit" href={`/courses/${id}`}>
            {course?.name}
          </Link>
        </Breadcrumbs>
        <h1 className="mb-8 text-4xl font-bold text-center">
          {" "}
          {course.title}{" "}
        </h1>
        <div className="max-w-[1200px] mx-auto  ">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <img
              src={
                course.image
                  ? `  /images/${course.image}`
                  : `/images/sampleImg.png`
              }
              alt={course.title}
              className="w-full h-full max-w-[500px] max-h-[500px] object-contain  "
            />
            <div className="flex flex-col ">
              <p className="mb-4 text-lg font-medium">
                {" "}
                {course?.description}{" "}
              </p>
              <div className="flex gap-2 ">
                <MonetizationOnIcon />
                <p className="mb-4 text-gray-400 text-md">{course?.price} </p>
              </div>
              <div className="flex gap-2 ">
                <div>
                  <AccessTimeFilledIcon />
                </div>
                <p className="mb-4 text-md"> {course?.duration} </p>
              </div>
              <div className="flex gap-2 ">
                <AutoAwesomeMosaicIcon />
                <p className="mb-4 text-md"> {course.category} Development</p>
              </div>
              <div className="flex gap-2 ">
                <LanguageIcon />
                <p className="mb-4 text-md"> {"English"} </p>
              </div>

              {role === "Admin" || role === "Instructor" ? (
                <Chip
                  color={course?.status === "pending" ? "error" : "success"}
                  label={course?.status}
                  className=" w-min"
                />
              ) : null}

              {course?.status === "pending" && role === "Admin" ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className=" w-[280px] mt-3"
                  onClick={handleOpen}
                >
                  Approve
                </Button>
              ) : null}
              <div className="flex gap-2 mt-lg-3">
                {role === "Instructor" && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className=" w-[280px] "
                    onClick={handleOpenDelete}
                  >
                    Delete Course
                  </Button>
                )}
                {role === "Instructor" && (
                  <Button
                    type="submit"
                    variant="default"
                    color="primary"
                    className="w-[280px] order-first"
                    href={`/update-course/${course._id}`}
                  >
                    Update Course Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Course Content */}
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
        <div className="flex justify-between ">
          <h1 className="mb-8 text-4xl font-bold text-start">
            {" "}
            Course Content{" "}
          </h1>
          {role === "Instructor" && (
            <Button
              variant="default"
              color="primary"
              className="px-4 -py-1"
              startIcon={<AddIcon />}
              href={`/add-lesson/${course._id}`}
            >
              Add Lesson
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 px-4 ">
          {Array.isArray(course?.lessons) && course?.lessons.length > 0 ? (
            <>
              {course.lessons.map((lesson, index) => (
                <Accordion
                  key={lesson._id}
                  expanded={expanded}
                  onChange={handleExpansion}
                  slots={{ transition: Fade }}
                  slotProps={{ transition: { timeout: 400 } }}
                  sx={{
                    "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                    "& .MuiAccordionDetails-root": {
                      display: expanded ? "block" : "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="flex gap-10 ">
                      <p className="text-xl font-medium ">
                        Lesson {index + 1} : {lesson?.title}{" "}
                      </p>
                      <p className="text-lg font-normal text-gray-400 ">
                        {lesson?.duration}
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-3 ">
                      {lesson?.video && (
                        <iframe
                          src={lesson?.video}
                          title={lesson?.title}
                          width="200px"
                          height="300px"
                        ></iframe>
                      )}
                      <p className="text-lg font-normal ">
                        {" "}
                        {lesson?.description}{" "}
                      </p>

                      {lesson?.notes && (
                        <a
                          href={`/pdf/${lesson?.notes}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          {" "}
                          Download PDF{" "}
                        </a>
                      )}
                      {role === "Instructor" && (
                        <Button
                          variant="outlined"
                          color="error"
                          className=" w-[230px] mt-3"
                          onClick={() => {
                            handleOpenDeleteLesson(lesson?._id);
                          }}
                        >
                          Delete this Lesson
                        </Button>
                      )}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            <h1 className="mb-8 text-2xl font-semibold text-center">
              {" "}
              No Content Available Yet{" "}
            </h1>
          )}
        </div>
      </motion.div>
      {/* approve modal */}
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
          <div className="flex justify-between ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleApprove}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      {/* delete course modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            Are you sure you want to Delete this course
          </h2>
          <div className="flex justify-between ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleCloseDelete}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>

      {/* delete lesson modal */}
      <Modal
        open={openDeleteLesson}
        onClose={handleCloseDeleteLesson}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            Are you sure you want to Delete this lesson
          </h2>
          <div className="flex justify-between ">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleLessonDelete}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-3 "
              onClick={handleCloseDeleteLesson}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <Toaster />
    </>
  );
};

export default SingleCourse;
