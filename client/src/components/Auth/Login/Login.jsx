import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { useFormik } from 'formik';
import useStyles from './style'
const Login = () => {
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
                   Login
               </Typography>
                <form className={classes.form} onSubmit={form.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            fullWidth
                            size="normal"
                            label="Email adress"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            variant="outlined"
                            label="Password"
                            fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing = {2}>
                        <Grid item xs={12} alignItems="center">
                            <Button className={classes.button} variant="contained" color="primary">Login</Button>
                        </Grid>
                    </Grid>
                </form>
           </div>
        </Container>
    )
}

export default Login;