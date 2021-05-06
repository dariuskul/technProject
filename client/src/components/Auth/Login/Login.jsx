import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import useStyles from "./style";
import { loginAction } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAction(values, history));
    },
  });
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.typography}>Login</Typography>
        <form className={classes.form} onSubmit={form.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                size="normal"
                label="Username"
                variant="outlined"
                id="username"
                name="username"
                value={form.values.username}
                onChange={form.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                id="password"
                name="password"
                value={form.values.password}
                onChange={form.handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} alignItems="center">
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
