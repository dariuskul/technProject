import { Button, Container } from "@material-ui/core";
import useStyles from "./styles";
const AdminDashboard = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <div className={classes.navigation}>
        <Button className={classes.button}>Posts</Button>
        <Button className={classes.button}>Users</Button>
      </div>
    </Container>
  );
};

export default AdminDashboard;
