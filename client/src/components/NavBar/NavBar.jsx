import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import useStyles from './style'
import { Button, Toolbar, Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'
const NavBar = () =>{
    const classes = useStyles()
    return(
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography component={Link} to='/' className={classes.heading}>
                    Coder<span>Media</span>
                </Typography>
                <div className={classes.buttons}>
                <Button component={Link} to='/auth/login' variant="contained"className={classes.button}>Login</Button>
                <Button component={Link} to='/auth/register' variant="contained"className={classes.button}>Sign Up</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar