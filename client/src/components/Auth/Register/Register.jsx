import React from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { registerAction } from "../../../redux/actions";
import * as Yup from "yup";
const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "At least 5 characters")
      .required("Username cannot be empty!"),
    password: Yup.string()
      .min(6, "Password must be with at least 6 characters")
      .required("Please provide password!"),
    firstName: Yup.string().required("Provide your first name!"),
    lastName: Yup.string().required("Provide your last name!"),
    dateOfBirth: Yup.date().required("Provide your birthday!"),
  });

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      role: "User",
      isSuspended: false,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(registerAction(values));
      resetForm();
    },
    validationSchema: RegisterSchema,
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
                error={form.errors.firstName ? true : false}
                helperText={form.errors.firstName ? form.errors.firstName : ""}
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
                error={form.errors.lastName ? true : false}
                helperText={form.errors.lastName ? form.errors.lastName : ""}
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
                error={form.errors.username ? true : false}
                helperText={form.errors.username ? form.errors.username : ""}
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
                error={form.errors.password ? true : false}
                helperText={form.errors.password ? form.errors.password : ""}
              />
            </Grid>
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
                error={form.errors.dateOfBirth ? true : false}
                helperText={
                  form.errors.dateOfBirth ? form.errors.dateOfBirth : ""
                }
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
