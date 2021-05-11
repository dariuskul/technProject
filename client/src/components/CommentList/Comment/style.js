import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  commentWrapper: {
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderBottom: "1px solid #efefef",
  },
  header: {
    fontSize: "larger",
    margin: 0,
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  h1: {
    fontSize: "larger",
    margin: 0,
    marginRight: "1em",
  },
  content: {
    fontSize: "larger",
    color: "black",
  },
}));
