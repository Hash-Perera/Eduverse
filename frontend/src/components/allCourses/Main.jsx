import React from "react";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
const Main = ({ courses }) => {
  return (
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
      <h1 className="text-4xl font-bold text-center mb-8"> Course Requests </h1>
      <div className="max-w-[1200px] mx-auto  ">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </motion.div>
  );
};

export default Main;
