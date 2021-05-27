import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  filter: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    padding: "12px",
    borderRadius: "10px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  filterTab: {
    fontSize: "larger",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "12px",
    padding: "12px",
    borderRadius: "10px",
    "&:hover": {
      background: "grey",
    },
  },
  button: {
    paddingRight: "2em",
    paddingLeft: "2em",
    border: "1px solid black",
    borderRadius: "10px",
    fontSize: "larger",
  },
}));
