import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontWeight: "1000",
      fontSize: "35px",
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "25px",
    },
  },
  media: {
    marginTop: "1em",
    backgroundBlendMode: "darken",
    width: "100%",
    objectFit: "fit",
  },
}));
