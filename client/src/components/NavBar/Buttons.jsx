import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Links } from "./Links";
import useStyles from "./style";
const Buttons = ({ role, handler }) => {
  const classes = useStyles();
  console.log("a", handler);
  return (
    <div className={classes.buttons}>
      {Links.map(
        (link, i) =>
          (link.role === role ||
            link.role === "any" ||
            (!role && link.role === "notUser") ||
            (typeof link.role === "object" && link.role.includes(role))) && (
            <Button
              className={classes.button}
              component={Link}
              to={link.path}
              key={i}
              onClick={link.label === "Logout" ? handler : ""}
            >
              {link.label}
            </Button>
          )
      )}
    </div>
  );
};

export default Buttons;
