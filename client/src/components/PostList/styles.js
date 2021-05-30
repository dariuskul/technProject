import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    marginTop: "4em",
    color: "black",
    overflow: "hidden",
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
