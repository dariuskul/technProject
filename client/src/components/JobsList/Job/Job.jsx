import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'

const Job = (props) =>{
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardHeader
            title={props.title}
            subheader={props.createdAt}
            />
        </Card>
    )
}
export default Job;