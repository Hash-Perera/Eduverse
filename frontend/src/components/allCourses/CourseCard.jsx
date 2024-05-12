import React from "react";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
const CourseCard = ({ course }) => {
  const role = localStorage.getItem("ds-role");
  return (
    <Link to={`/course/${course._id}`}>
      <div className="grid shadow-md hover:scale-105 md:grid-cols-4 grid-cols-1 gap-4 px-4 w-full py-3">
        <div className="col-span-1">
          <img
            src={
              course.image ? `/images/${course.image}` : "/images/sampleImg.png"
            }
            alt="course"
            className="w-full h-[175px] object-cover"
          />
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">{course?.name}</div>

              <div className="text-xl font-semibold">
                $ {""} {course?.price}
              </div>
            </div>
            <div className="text-gray-500">{course?.description}</div>
            <div className="flex justify-between">
              <div className="text-gray-500 flex items-center gap-2">
                <AutoAwesomeMosaicIcon />
                {course?.category} {""} Development
              </div>
              {role === "Admin" || role === "Instructor" ? (
                <Chip
                  color={course?.status === "pending" ? "error" : "success"}
                  label={course?.status}
                />
              ) : null}
            </div>

            <div className=" flex items-center gap-2">
              <AccessTimeFilledIcon />
              {course?.duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
