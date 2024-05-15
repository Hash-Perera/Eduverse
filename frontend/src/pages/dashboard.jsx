import PrimaryAppBar from "../components/header";
import AllCoursesAdmin from "./AllCoursesAdmin";
import AllCourses from "./AllCourses";

const Dashboard = () => {
  const role = localStorage.getItem("ds-role");
  return (
    <>
      <PrimaryAppBar />

      {(role === "Admin" || role === "Instructor") && <AllCoursesAdmin />}
      {role === "Learner" && <AllCourses />}
    </>
  );
};

export default Dashboard;
