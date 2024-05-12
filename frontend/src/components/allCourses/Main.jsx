import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Main = ({ courses }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        {Array.isArray(courses) && courses.length > 0 ? (
          loading ? (
            <>
              <Box sx={{ width: 1000 }}>
                {courses.map((course) => (
                  <div className=" py-3 flex gap-2 w-full">
                    <div>
                      <Skeleton
                        variant="rectangular"
                        width={226}
                        height={175}
                      />
                    </div>
                    <div className=" w-[600px]">
                      <Skeleton />
                      <Skeleton animation="wave" />
                      <Skeleton animation={false} />
                      <Skeleton />
                      <Skeleton animation="wave" />
                      <Skeleton animation={false} />
                    </div>
                  </div>
                ))}
              </Box>
            </>
          ) : (
            courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )
        ) : (
          <h1 className="text-2xl font-semibold items-center text-center mb-8">
            No Courses Found
          </h1>
        )}
      </div>
    </>
  );
};

export default Main;
