import React from "react";
import AppBar from "@material-ui/core/AppBar";
import useStyles from "./style";
import { Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions";
const NavBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    dispatch(logOut(history));
  };
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography component={Link} to="/" className={classes.heading}>
          Coder<span>Media</span>
        </Typography>
        {user ? (
          <div className={classes.buttons}>
            <Button
              component={Link}
              to="/posts"
              variant="contained"
              className={classes.button}
            >
              Posts
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
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
