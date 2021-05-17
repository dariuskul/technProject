import { Container } from "@material-ui/core";
import { Switch, useHistory, useLocation } from "react-router";
import Filter from "./Filter/Filter";
import useStyles from "./styles";
const AdminDashboard = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <div className={classes.navigation}>
        <Filter />
      </div>
    </Container>
  );
};

export default AdminDashboard;
