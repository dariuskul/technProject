import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    marginTop: "4em",
  },
  navigation: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    paddingRight: "2em",
    paddingLeft: "2em",
    border: "1px solid black",
    borderRadius: "10px",
    fontSize: "larger",
  },
}));
