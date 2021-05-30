import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Job from "./Job/Job";

import useStyles from "./styles";
const JobsList = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [page, setpage] = useState(1);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:2000/outer_service/jobs?page=${page}?full_time=${check}`
      );
      const newData = await response.json();

      let data = [];
      for (var key in newData) {
        data.push(newData[key]);
      }
      setData(data);
    };
    fetchData();
  }, [page, check]);
  const handleClick = () => {
    let count = page;
    count++;
    setpage(count);
  };
  const handleCheck = () => {
    setCheck(!check);
  };
  return (
    <Container className={classes.container} size="lg">
      {data ? (
        <Grid className={classes.container} container spacing={5}>
          <div className={classes.sorting}>
            <InputLabel>Select: </InputLabel>
            <Button className={classes.jobButton} onClick={handleCheck}>
              {check ? "All jobs" : "Full time"}
            </Button>
          </div>
          {data.map((job) => (
            <Grid key={job.id} item xl={12} xs={12}>
              <Job
                company={job.company}
                title={job.title}
                createdAt={job.created_at}
                apply={job.how_to_apply}
                type={job.type}
              />
            </Grid>
          ))}
          <Button
            className={classes.button}
            onClick={handleClick}
            variant="contained"
            color="primary"
          >
            More jobs
          </Button>
        </Grid>
      ) : (
        <CircularProgress className={classes.circular} size="8em" />
      )}
    </Container>
  );
};

export default JobsList;
