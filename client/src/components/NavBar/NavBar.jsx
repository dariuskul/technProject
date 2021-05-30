import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import useStyles from "./style";
import { Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, logOut } from "../../redux/actions";
import MobileNavBar from "./MobileNavBar";
import Buttons from "./Buttons";
const NavBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!user?.length > 0) {
      dispatch(getUserAction(history));
    }
  }, [dispatch, history, user?.length]);
  const handleClick = () => {
    dispatch(logOut(history));
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component={Link}
            to="/"
            variant="body1"
            className={classes.heading}
          >
            Coder<span>Media</span>
          </Typography>
          <Buttons role={user?.user?.role} handler={handleClick} />
          <MobileNavBar handler={handleClick} role={user?.user?.role} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
