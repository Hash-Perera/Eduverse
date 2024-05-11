import React, { useEffect, useState } from "react";

import PrimaryAppBar from "../components/header";
import { Link } from "react-router-dom";
import axios from "axios";
import Main from "../components/allCourses/Main";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const newToken = localStorage.getItem("ds-token");
    const role = localStorage.getItem("ds-role");
    axios
      .get(
        "http://localhost:8000/ms-course/course/filters?category=all&status=pending",
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
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
      <PrimaryAppBar />
      <Main courses={courses} />
    </>
  );
};

export default AllCourses;
