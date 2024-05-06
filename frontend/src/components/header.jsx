import * as React from "react";
import { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo1 from "../assets/images/Logo1.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const options = [
  "Show some love to MUI",
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const token = localStorage.getItem("token");

export default function PrimaryAppBar() {
  const Navigate = useNavigate();

  const [token, setToken] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [newNotifiCount, setNewNotifiCount] = React.useState(0);

  //! Use effect
  useEffect(() => {
    const token = localStorage.getItem("ds-token");
    if (token) {
      setToken(token);
      getNotifications();
    }
  }, []);

  //! Logout
  const handleLogOut = () => {
    localStorage.removeItem("ds-token");
    Navigate("/");
  };

  //! Profile Click
  const handleProfileClick = () => {
    Navigate("/profile");
  };
  //! Get Notifications
  const getNotifications = async () => {
    const newToken = await localStorage.getItem("ds-token");
    axios
      .get(
        "http://localhost:8000/ms-notification/notification/get-notifications-10",
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      )
      .then((res) => {
        setNotifications(res.data.data);
        const newNotifi = res.data.data.filter(
          (notifi) => notifi.viewed === false
        );
        setNewNotifiCount(newNotifi.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //! Mark as read
  const handleViewButtonClick = async (id) => {
    const newToken = await localStorage.getItem("ds-token");
    axios
      .put(
        `http://localhost:8000/ms-notification/notification/mark-as-read/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      )
      .then((res) => {
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //!=========================================================================
  const [anchorElNotifi, setAnchorElNotifi] = React.useState(null);

  const openNotifi = Boolean(anchorElNotifi);
  const handleClickListItem = (event) => {
    setAnchorElNotifi(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorElNotifi(null);
  };

  const handleClose = () => {
    setAnchorElNotifi(null);
  };

  //!=========================================================================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //! Profile icon click menu
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ width: "900px" }}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );

  //! Mobile Responsive Menu
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={newNotifiCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //! Notification Menu
  const notifiMenu = (
    <Menu
      id="lock-menu"
      anchorEl={anchorElNotifi}
      open={openNotifi}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "lock-button",
        role: "listbox",
      }}
      slotProps={{
        paper: {
          style: {
            minWidth: "450px",
            maxHeight: "500px",
            overflowY: "scroll",
            overflowX: "hidden",
          },
        },
      }}
    >
      <Button varient="outlined">view all</Button>
      {notifications.map((option, index) => (
        <MenuItem
          key={option._id}
          disabled={option.viewed === true}
          onClick={(event) => handleMenuItemClick(event, index)}
          sx={{ display: "flex", justifyContent: "space-between" }} // Align items horizontally
        >
          {option.title}
          <IconButton onClick={(event) => handleViewButtonClick(option._id)}>
            {option.viewed ? <CheckCircleOutlineIcon /> : <CheckCircleIcon />}
          </IconButton>
        </MenuItem>
      ))}
    </Menu>
  );

  //!=========================================================================

  //! Main AppBar
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          color: "#1d7a95",
          boxShadow: "none",
          height: "80px",
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography> */}

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <img src={Logo1} alt="Your Image" style={{ height: "22rem" }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {token && (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleClickListItem}
                >
                  <Badge badgeContent={newNotifiCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}

            {!token && (
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  onClick={() => {
                    Navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    Navigate("/signin");
                  }}
                >
                  Signup
                </Button>
              </Stack>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {notifiMenu}
    </Box>
  );
}
