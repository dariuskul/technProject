import { Button, CircularProgress, Container, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Sort from '../Sort/Sort';
import Job from './Job/Job';

import useStyles from './styles'
const api = "https://jobs.github.com/positions.json?";
const JobsList = () =>{
    const classes = useStyles()
    const [data,setData] = useState(null)
    const [page, setpage] = useState(1)
    const [sort,setSort] = useState()
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?page=${page}`);
          const newData = await response.json();
          console.log(newData)
          setData(newData);
        };
        fetchData();
        console.log(data)
      },[page]);
     const handleClick = () => {
          let count = page;
          count++;
          setpage(count)
          console.log(page)
      }

      const handleChange = (e) =>{
          setSort(e.target.value)
      }
    return(
        <Container className={classes.container} size='lg'>
            {data ?
            <Grid className={classes.container} container spacing={5}>
            <div className={classes.sorting}>
            <InputLabel>Sort by</InputLabel>
            <Select
            value={sort}
            onChange={handleChange}
            autoWidth
            >
                <MenuItem value={'company'}>By company</MenuItem>
                <MenuItem value={'createdAt'}>By creation date</MenuItem>
            </Select>
            </div>
            <Sort by={sort}>
                {data.map(job => <Grid xl={12}> 
                    <Job company={job.company} title={job.title} createdAt={job.created_at}/>
                </Grid>)}
                </Sort> 
                <Button className={classes.button} onClick={handleClick} variant="contained" color="primary">More jobs</Button>
            </Grid> : <CircularProgress className={classes.circular} size='8em'/>}
        </Container>
    )
}

export default JobsList;