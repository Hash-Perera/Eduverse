import React, { useEffect, useState } from "react";

import PrimaryAppBar from "../components/header";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/ms-course/course/filters?category=all&status=active",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ds-token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div
        className=""
        style={{
          padding: "40px",
          background: "#f8f8f8",
        }}
      >
        <h1 style={{ textAlign: "center" }}>All Courses</h1>
        <Grid container spacing={2} padding={0}>
          {courses.map((course) => (
            <Grid item xs={12} sm={12} md={3} lg={3} key={course._id}>
              <div
                className="card text-bg-light p-3"
                style={{
                  background: "#ececec",
                  color: "black",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  transition: "5s",
                  padding: "10px",
                  margin: "10px",
                  textAlign: "center}} ",
                  height: "100%",
                }}
              >
                <img
                  src={
                    course.image
                      ? `/images/${course.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="Course"
                  className="card-img-top w-full h-[175px] object-cover rounded-lg"
                  /* style={{
                    objectFit: "fill",
                    height: "200px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#263032",
                  }} */
                />
                <div
                  className="card-body"
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "space-between",
                      /*   alignItems: "center", */
                    }}
                  >
                    <h4 className="card-text">{course.name}</h4>
                    <p className="card-text">{course.duration}</p>
                  </div>
                  <p className="card-text" style={{ letterSpacing: "1px" }}>
                    <b>Category: {course.category}</b>
                  </p>
                </div>
                <Link
                  to={`/course/${course._id}`}
                  className="btn btn-danger "
                  style={{
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  View Course
                </Link>
              </div>
              <br />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AllCourses;
