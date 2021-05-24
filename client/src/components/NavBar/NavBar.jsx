import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import useStyles from "./style";
import { Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, logOut } from "../../redux/actions";
import Cookies from 'js-cookie';
const NavBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(()=> {
    if(!user?.length > 0){
      dispatch(getUserAction(history))
      console.log("YE..")
    }
  },[dispatch])
  const handleClick = () => {
    dispatch(logOut(history));
  };
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography component={Link} to="/" className={classes.heading}>
          Coder<span>Media</span>
        </Typography>
        {user.user?.id ? (
          <div className={classes.buttons}>
            {user.user?.role === "Admin" && (
              <Button
                component={Link}
                to="/admin"
                variant="contained"
                className={classes.button}
              >
                Admin zone
              </Button>
            )}
            <Button
              component={Link}
              to="/myposts"
              variant="contained"
              className={classes.button}
            >
              My posts
            </Button>
            <Button
              component={Link}
              to="/carrers"
              variant="contained"
              className={classes.button}
            >
              Carrers
            </Button>
            <Button
              component={Link}
              to="/tweets"
              variant="contained"
              className={classes.button}
            >
              Tweets
            </Button>

            <Button
              variant="contained"
              className={classes.button}
              onClick={handleClick}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className={classes.buttons}>
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              className={classes.button}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              variant="contained"
              className={classes.button}
            >
              Sign Up
            </Button>
            <Button
              component={Link}
              to="/carrers"
              variant="contained"
              className={classes.button}
            >
              Carrers
            </Button>
            <Button
              component={Link}
              to="/tweets"
              variant="contained"
              className={classes.button}
            >
              Tweets
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
