import { Container, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions";
import PostList from "../PostList/PostList";
import useStyles from "./styles";
const UserPosts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userId = useSelector((state) => state.user?.user);

  useEffect(() => {
    dispatch(getUserProfile(userId.id, userId.id));
  }, [dispatch, userId.id]);
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper style={{ paddingBottom: "4em" }} elevation={3}>
        <h1 className={classes.h1}>Your posts</h1>
        <PostList viewProfile />
      </Paper>
    </Container>
  );
};

export default UserPosts;
