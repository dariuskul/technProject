import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  container: {
    marginTop: "4em",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    paddingRight: "2em",
    paddingLeft: "2em",
    border: "1px solid black",
    borderRadius: "10px",
    fontSize: "larger",
  },
}));
