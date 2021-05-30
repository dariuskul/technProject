import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Job = (props) => {
  const classes = useStyles();
  const regex = /(<([^>]+)>)/gi;
  const job_apply = props.apply.replace(regex, "");
  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.company}
        subheader={props.title}
        classes={{
          root: classes.title,
          subheader: classes.label,
        }}
      />
      <CardContent>
        <Typography>
          {job_apply.startsWith("htt") ? (
            <Button className={classes.button} href={job_apply}>
              Apply
            </Button>
          ) : (
            job_apply
          )}
        </Typography>
        <Typography variant="h5">{props.type}</Typography>
      </CardContent>
    </Card>
  );
};
export default Job;
