import axios from "axios";
import { useEffect, useState } from "react";
import PrimaryAppBar from "../components/header";
import { Divider, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ds-token");
    axios
      .get(
        "http://localhost:8000/ms-notification/notification/get-notifications-10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setNotifications(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <PrimaryAppBar />

      <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
        <Grid container className="main-box">
          <Grid
            item
            xs={12}
            className="d-flex align-items-center justify-content-center p-4"
          >
            <h2>Notifications</h2>
          </Grid>
          {!loading && (
            <Grid item xs={12} className="p-4">
              {notifications.map((notification, index) => (
                <div key={index}>
                  <Typography variant="h6">{notification.title}</Typography>
                  <Typography variant="body2">
                    {notification.message}
                  </Typography>
                  <Divider className="mb-2" />
                </div>
              ))}
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

export default ViewNotifications;
