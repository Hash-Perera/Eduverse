import React, { useEffect, useState } from "react";
import PrimaryAppBar from "../components/header";
import "../css/CourseDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

const CourseDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [course, setCourse] = useState({});
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/ms-course/course/get-by-id/${id}`
        );
        // Fetch course details by id
        setCourse(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseDetails(); // Call the fetchCourseDetails function
  }, [id]);

  return (
    <>
      <PrimaryAppBar />
      <div className="container course-details-container col-md-10">
        <h1 className="course-details-heading">Course Details</h1>

        <div className="card-body course-details-content">
          <div className="course-details-image">
            <img
              src={
                course.image
                  ? `/images/${course.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Course"
              className="w-full h-[175px] object-cover rounded-lg"
            />
          </div>
          <div className="course-details-info flex">
            <h2 className="course-name" style={{ color: "black" }}>
              <br />
              {course.name}
            </h2>
            <p className="course-description">
              <b>Course Description:</b>
              <br />
              {course.description}
            </p>
            <p className="course-instructor">
              <b> Course Instructor : {course.instructor}</b>
            </p>

            <p className="course-price">
              <b> ${course.price}</b>
            </p>
            <p className="course-duration">
              <b>{course.duration}</b>
            </p>
            <button className="purchase-button">Purchase</button>
          </div>
        </div>

        <Accordion className="accordion-container" alwaysOpen>
          {course.lessons &&
            course.lessons.map((lesson, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header className="header border-none">
                  {lesson.title}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  <div className="card-body">
                    <h2>purchase first to view lessons</h2>

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

export default CourseDetails;
