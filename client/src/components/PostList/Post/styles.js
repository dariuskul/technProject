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
  },
  title: {
    color: "black",
    fontSize: "30px",
    fontWeight: "bolder",
  },
  media: {
    marginTop: "1em",
    backgroundBlendMode: "darken",
    objectFit: "fit",
    width: '100%',
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
  },
  count: {
    marginLeft: "0.2em",
  },
  creator: {
    padding: '0',
    color: "black",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  hidePost: {
    padding: '0',
    color: "black",
    fontSize: "20px",
    fontWeight: "bolder",
    marginLeft: '0.5em'
  }
}));
