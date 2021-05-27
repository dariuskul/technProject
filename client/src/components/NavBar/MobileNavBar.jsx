import { Button, Drawer } from "@material-ui/core";
import { Fragment, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import Buttons from "./Buttons";
import { Links } from "./Links";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
const MobileNavBar = ({ role }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.mobileMenu}>
      <Button onClick={() => setOpen(true)}>
        <MenuIcon className={classes.menuIcon} />
      </Button>
      <Drawer open={open} className={classes.mobileButtons}>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          className={classes.close}
        >
          <CloseIcon />
        </Button>
        {Links.map(
          (link, i) =>
            (link.role === role ||
              link.role === "any" ||
              (!role && link.role === "notUser") ||
              (typeof link.role === "object" && link.role.includes(role))) && (
              <div>
                <Button
                  className={classes.button}
                  component={Link}
                  to={link.path}
                  key={i}
                >
                  {link.label}
                </Button>
                <Divider />
              </div>
            )
        )}
      </Drawer>
    </div>
  );
};

export default MobileNavBar;
