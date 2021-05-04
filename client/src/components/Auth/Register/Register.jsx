import React from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { registerAction } from "../../../redux/actions";
const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      // email: "",
      role: "User",
      isSuspended: false,
    },
    onSubmit: (values) => {
      alert(values);
      dispatch(registerAction(values));
    },
  });
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.typography}>Register</Typography>
        <form className={classes.form} onSubmit={form.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="normal"
                label="First name"
                variant="outlined"
                id="firstName"
                name="firstName"
                value={form.values.firstName}
                onChange={form.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Last name"
                fullWidth
                id="lastName"
                name="lastName"
                value={form.values.lastName}
                onChange={form.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                label="Username"
                fullWidth
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
            {/*}
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                fullWidth
                id="email"
                name="email"
                value={form.values.email}
                onChange={form.handleChange}
              />
            </Grid>
  */}
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                label="Date of birth"
                type="date"
                fullWidth
                id="dateOfBirth"
                name="dateOfBirth"
                value={form.values.dateOfBirth}
                onChange={form.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} alignItems="center">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
