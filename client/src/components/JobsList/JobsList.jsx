import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Job from './Job/Job';

import useStyles from './styles'
const api = "https://jobs.github.com/positions.json?";
const JobsList = () =>{
    const classes = useStyles()
    const [data,setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?`);
          const newData = await response.json();
          console.log(newData)
          setData(newData);
        };
        fetchData();
      },[fetch]);
    return(
        <Container className={classes.container} size='lg'>
            {data ? <Grid container spacing={5}>
                {data.map(job => <Grid xl={12}> 
                    <Job company={job.company} title={job.title}/>
                </Grid>)}
            </Grid> : <CircularProgress className={classes.circular} size='8em'/>}
        </Container>
    )
}

export default JobsList;