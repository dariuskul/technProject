import React from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import useStyles from './style'
const Register = () => {
    const classes = useStyles();
    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        }
    })
    return(
        <Container maxWidth='xs'>
           <div className={classes.paper}>
               <Typography className={classes.typography}>
                   Register
               </Typography>
                <form className={classes.form} onSubmit={form.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            fullWidth
                            size="normal"
                            label="First name"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            variant="outlined"
                            label="Second name"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            variant="outlined"
                            label="Email adress"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            variant="outlined"
                            label="Password"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            variant="outlined"
                            label="Repeat password"
                            fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing = {2}>
                        <Grid item xs={12} alignItems="center">
                            <Button className={classes.button} variant="contained" color="primary">Register</Button>
                        </Grid>
                    </Grid>
                </form>
           </div>
        </Container>
    )
}

export default Register;