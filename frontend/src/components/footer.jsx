import * as React from "react";
import { Grid, Typography } from "@mui/material";
import colors from "../constants/colors";
import Logo1 from "../assets/images/Logo1.png";

const Footer = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: colors.darkGray, color: colors.white }}
        paddingLeft={10}
        paddingBottom={5}
        paddingTop={5}
      >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <div className="d-flex flex-column align-items-start">
            <Typography variant="h6">Popular Skills</Typography>
            <Typography variant="body">Digital Marketing</Typography>
            <Typography variant="body">Cybersecurity</Typography>
            <Typography variant="body">Project Management</Typography>
            <Typography variant="body">Python</Typography>
            <Typography variant="body">Data Analytics</Typography>
            <Typography variant="body">Excel</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <div className="d-flex flex-column align-items-start">
            <Typography variant="h6">Popular AI Courses</Typography>
            <Typography variant="body">
              Prompt Engineering for ChatGPT Course
            </Typography>
            <Typography variant="body">
              Machine Learning Specialization
            </Typography>
            <Typography variant="body">
              IBM AI Product Manager Professional Certificate
            </Typography>
            <Typography variant="body">AI For Everyone Course</Typography>
            <Typography variant="body">
              Generative AI with LLMs Course
            </Typography>
            <Typography variant="body">
              Supervised Machine Learning Course
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <div className="d-flex flex-column align-items-start">
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <div className="d-flex flex-column align-items-start">
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
            <Typography variant="body">About Us</Typography>
          </div>
        </Grid>
        <img src={Logo1} alt="Your Image" style={{ height: "22rem" }} />
      </Grid>
    </>
  );
};
export default Footer;
