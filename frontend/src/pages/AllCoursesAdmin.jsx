import React, { useEffect, useState } from "react";
import PrimaryAppBar from "../components/header";
import { motion } from "framer-motion";
import axios from "axios";
import Main from "../components/allCourses/Main";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AllCoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const role = localStorage.getItem("ds-role");
  const [status, setStatus] = useState(role === "Admin" ? "pending" : "active");
  const [category, setCategory] = useState("all");

  // Function to fetch courses based on category and status
  const fetchCourses = async () => {
    const newToken = localStorage.getItem("ds-token");
    try {
      const uri =
        role === "Admin"
          ? `http://localhost:8000/ms-course/course/filters`
          : `http://localhost:8000/ms-course/course/instructor-courses`;
      const response = await axios.get(`${uri}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
        params: {
          category,
          status,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [category, status]);

  const handleRadioChange = (event) => {
    // Update category or status based on radio button selection
    if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "status") {
      setStatus(event.target.value);
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
        className="max-w-[1440px] mx-auto px-4"
      >
        <h1 className="mb-12 text-4xl font-bold text-center">
          {role === "Admin" ? "Course Requests" : "My Courses"}
        </h1>
      </motion.div>
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
        className="max-w-[1440px] flex flex-col md:flex-row gap-2 mx-auto px-4"
      >
        {role === "Instructor" && (
          <div className="w-[300px] h-[380px] px-4 py-4 shadow-md">
            <h1 className="text-2xl font-bold text-center">Filters</h1>
            <div className="flex flex-col ">
              <FormControl>
                <FormLabel>Category</FormLabel>
                <RadioGroup
                  name="category"
                  value={category}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="web"
                    control={<Radio />}
                    label="Web Development"
                  />
                  <FormControlLabel
                    value="mobile"
                    control={<Radio />}
                    label="Mobile Development"
                  />
                  {/* Add more category options as needed */}
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={status}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />

                  {/* Add more status options as needed */}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        )}
        <Main courses={courses} />
      </motion.div>
    </>
  );
};

export default AllCoursesAdmin;
