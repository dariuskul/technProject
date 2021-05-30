import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    borderRadius: 15,
    margin: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 50px",
    backgroundColor: "white",
  },
  heading: {
    marginLeft: "0",
    textDecoration: "none",
    color: "black",
    fontSize: "50px",
    fontWeight: "bold",
    justifyContent: "center",
    textTransform: "uppercase",
    "& $span": {
      color: "red",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    [theme.breakpoints.down(1239)]: {
      display: "none",
    },
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  alert: {
    alignItems: "center",
  },
  button: {
    minHeight: "50px",
    color: "black",
    fontSize: "20px",
    fontFamily: ['"Roboto"', "sans sherif"].join(","),
    margin: "0px 0px 0px 20px",
    border: "none",
    backgroundColor: "white",
    boxShadow: "none",
    fontWeight: "1000",
  },

  mobileMenu: {
    display: "flex",
    [theme.breakpoints.up(1238)]: {
      display: "none",
    },
  },

  menuIcon: {
    marginLeft: "auto",
    flex: 2,
    fontSize: "30px",
    [theme.breakpoints.up(1238)]: {
      display: "none",
    },
  },
  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  paper: {
    width: "200px",
  },
  mobileButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));
