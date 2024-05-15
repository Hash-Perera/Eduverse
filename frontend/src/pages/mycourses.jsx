import React, { useEffect, useState } from "react";

import PrimaryAppBar from "../components/header";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/common-card";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ds-token");
    axios
      .get(`http://localhost:8000/ms-learner/learner/courses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);

        setCourses(response.data.data.courseDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <PrimaryAppBar />

      <div
        className=""
        style={{
          padding: "40px",
        }}
      >
        <h1 className="mb-8 text-3xl font-semibold text-center ">My Courses</h1>
        <Grid container spacing={2} padding={0}>
          {courses.map((course) => (
            <Grid item xs={12} sm={12} md={4} lg={3} key={course._id}>
              <div className="rounded-t-lg card text-bg-light">
                <img
                  src={
                    course.image
                      ? `/images/${course.image}`
                      : "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  style={{
                    objectFit: "fill",
                    height: "200px",
                    width: "100%",
                  }}
                  alt="..."
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
                  <div className="flex items-center justify-between w-full ">
                    <h4 className="font-medium card-text">{course.name}</h4>
                    <p className="text-gray-400 card-text">{course.duration}</p>
                  </div>
                  <p className="font-normal " style={{ letterSpacing: "1px" }}>
                    <>
                      Category: {course.category} {""}Development
                    </>
                  </p>
                  <p className="text-gray-400 mt-1 line-clamp-2 min-h-[47px] card-text">
                    {course?.description}
                  </p>
                </div>
                <div className="flex items-center justify-between px-3 py-2 ">
                  <VerifiedUserIcon className="text-green-500" />
                  <Link
                    to={`/mycourse/${course._id}`}
                    className="text-lg font-semibold hover:cursor-pointer hover:font-bold hover:scale-105"
                  >
                    View Course
                  </Link>
                </div>
              </div>
              <br />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default MyCourses;
