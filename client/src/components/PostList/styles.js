import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  container: {
    marginTop: "4em",
    color: "black",
  },
  inputContainer: {
    marginBottom: "2em",
  },
  input: {
    width: "100%",
    color: "primary",
    textAlign: "right",
  },
  modal: {
    padding: "2em",
    display: "flex",
    justifyContent: "center",
  },
}));
