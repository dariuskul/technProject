import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontWeight: "bolder",
      fontSize: "35px",
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "30px",
      color: "black",
    },
  },
  main: {
    color: "black",
    fontSize: "15px",
    fontWeight: "bolder",
    height: "100%",
    minWidth: 345,
    [theme.breakpoints.down("md")]: {
      minWidth: 200,
    },
  },
  title: {
    color: "black",
    fontSize: "30px",
    [theme.breakpoints.down("md")]: {
      minWidth: "10px",
    },
    fontWeight: "bolder",
  },
  media: {
    marginTop: "1em",
    backgroundBlendMode: "darken",
    objectFit: "cover",
    width: "100%",
    height: "auto",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
  },
  count: {
    marginLeft: "0.2em",
  },
  creator: {
    padding: "0",
    color: "black",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  hidePost: {
    padding: "0",
    color: "black",
    fontSize: "20px",
    fontWeight: "bolder",
    marginLeft: "0.5em",
  },
  content: {
    fontSize: "20px",
    overFlowWrap: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  iconButtons: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(1105)]: {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
}));
