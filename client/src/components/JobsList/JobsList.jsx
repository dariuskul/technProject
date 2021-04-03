import { Button, CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Job from './Job/Job';

import useStyles from './styles'
const api = "https://jobs.github.com/positions.json?";
const JobsList = () =>{
    const classes = useStyles()
    const [data,setData] = useState(null)
    const [page, setpage] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?page=${page}`);
          const newData = await response.json();
          console.log(newData)
          setData(newData);
        };
        fetchData();
      },[page]);
     const handleClick = () => {
          let count = page;
          count++;
          setpage(count)
          console.log(page)
      }
    return(
        <Container className={classes.container} size='lg'>
            {data ? <Grid className={classes.container} container spacing={5}>
                {data.map(job => <Grid xl={12}> 
                    <Job company={job.company} title={job.title}/>
                </Grid>)}
                <Button className={classes.button} onClick={handleClick} variant="contained" color="primary">More jobs</Button>
            </Grid> : <CircularProgress className={classes.circular} size='8em'/>}
        </Container>
    )
}

export default JobsList;