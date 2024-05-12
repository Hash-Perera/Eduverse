import React, { useEffect, useState } from "react";
import PrimaryAppBar from "../components/header";
import "../css/CourseDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { Checkbox } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";

const MyCourseDetails = () => {
  const { id } = useParams();
  const courseId = id;
  const [course, setCourse] = useState({});
  const [completedLessons, setCompletedLessons] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/ms-learner/learner/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ds-token")}`,
            },
          }
        );
        // Fetch course details by id
        setCourse(response.data.data.courseDetails);
        setCompletedLessons(response.data.data.progress); // Initialize completed lessons with progress from backend
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseDetails(); // Call the fetchCourseDetails function
  }, [id]);

  const handleCheckboxClick = (index, isChecked) => {
    const updatedCompletedLessons = isChecked
      ? completedLessons + 1 // Increment completed lessons
      : completedLessons - 1; // Decrement completed lessons

    // Calculate progress percentage
    const progressPercentage = updatedCompletedLessons / course.lessons.length;

    console.log(isChecked);

    setCompletedLessons(updatedCompletedLessons);
    updateProgress(progressPercentage); // Update progress to the backend
  };

  const updateProgress = async (progress) => {
    try {
      await axios.put(
        `http://localhost:8000/ms-learner/learner/course/progress/`,
        {
          courseId: courseId,
          progress: progress,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ds-token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    axios
      .get(`http://localhost:8000/ms-learner/learner/progress/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ds-token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.progress);
        const progressData = response.data.data;
        setCompletedLessons(parseInt(progressData.progress)); // Set completed lessons from the response
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId]); */

  const deleteCourse = async () => {
    try {
      await axios
        .delete(
          `http://localhost:8000/ms-learner/learner/course/unenroll/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ds-token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          Navigate("/mycourses");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PrimaryAppBar />
      <div className="container course-details-container col-md-10">
        <h1 className="course-details-heading">Course Details</h1>
        <div className="course-details-buttons">
          <button
            className="forward-button unenroll-button"
            onClick={() => deleteCourse()}
          >
            <b>UnEnroll</b>
          </button>
        </div>

        <div className="card-body course-details-content">
          <div className="course-details-image">
            <img
              src={
                course.image
                  ? `/images/${course.image}`
                  : "https://via.placeholder.com/400"
              }
              alt="Course"
              className=" object-cover rounded-lg"
            />
          </div>
          <div className="course-details-info ">
            <h2 className="course-name" style={{ color: "black" }}>
              <br />
              {course.name}
              <br />
            </h2>
            <p className="course-description">
              <b>Course Description:</b>
              <br />
              <br />
              {course.description}
            </p>
            <br />
            <p className="course-instructor">
              <b> Course Instructor : {course.instructor}</b>
            </p>

            <p className="course-price">{/* <b> ${course.price}</b> */}</p>
            <p className="course-duration">
              <b>Duration : {course.duration}</b>
            </p>
          </div>
        </div>
        <div
          className="progress-chart"
          style={{ width: "400px", margin: "auto" }}
        >
          <h3 className="progress-heading">Course Progress</h3>
          <PieChart
            data={[
              {
                title: "Completed",
                value: completedLessons,
                color: "#6bd13f",
                label: "Completed",
              },
              {
                title: "Remaining",
                value: course.lessons
                  ? course.lessons.length - completedLessons
                  : 0,
                color: "#d1e7eb",
                label: "Remaining",
              }, // Check if course.lessons exists
            ]}
          />
        </div>

        <Accordion className="accordion-container" alwaysOpen>
          {course.lessons &&
            course.lessons.map((lesson, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header className="header">
                  <Checkbox
                    className="checkbox-progress"
                    checked={index < completedLessons}
                    onChange={(e) =>
                      handleCheckboxClick(index, e.target.checked)
                    }
                  />

                  {lesson.title}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  <div className="card-body">
                    <div className="video-container">
                      <iframe
                        width="100%"
                        height="400rem"
                        src={lesson.video} // Assuming lesson.video contains the URL of the video
                        frameborder="0"
                        allowfullscreen
                        title={lesson.title}
                      ></iframe>
                    </div>
                    <div className="video-details">
                      <p>
                        <strong>Description:</strong> {lesson.description}
                      </p>
                      <p>
                        <strong>Duration:</strong> {lesson.duration}
                      </p>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </>
  );
};

export default MyCourseDetails;
