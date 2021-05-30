import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useFormik } from "formik";
import useStyles from "./style";
import { loginAction } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Please provide username!"),
    password: Yup.string().required("Please provide password!"),
  });

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAction(values, history));
    },
    validationSchema: LoginSchema,
  });
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.typography}>Login</Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                size="medium"
                label="Username"
                variant="outlined"
                id="username"
                name="username"
                value={form.values.username}
                onChange={form.handleChange}
                error={form.errors.username ? true : false}
                helperText={form.errors.username ? form.errors.username : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                size="medium"
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                id="password"
                name="password"
                value={form.values.password}
                onChange={form.handleChange}
                error={form.errors.password ? true : false}
                helperText={form.errors.password ? form.errors.password : ""}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                onClick={form.handleSubmit}
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
