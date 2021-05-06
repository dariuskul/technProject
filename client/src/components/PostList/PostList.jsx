import {
  Container,
  Grid,
  Input,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/actions";
import ModalForm from "../ModalForm/ModalForm";
import Post from "./Post/Post";
import useStyles from "./styles";
const PostList = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state?.posts?.initialState?.posts);
  const dispatch = useDispatch();
  const [created, setCreated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPosts());
    };
    fetchData();
  }, [dispatch]);
  console.log(user);
  return (
    <div className={classes.container}>
      <Container className={classes.inputContainer} maxWidth="xl">
        {user && (
          <Button
            onClick={() => setOpenModal(true)}
            color="primary"
            variant="outlined"
            className={classes.input}
          >
            Wanna share your insights about something, {user?.firstName}?
          </Button>
        )}
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {posts?.map((post) => (
            <Grid key={post.id} item xs={12} sm={6}>
              <Post post={post} creator={user?.id} />
            </Grid>
          ))}
        </Grid>
        <ModalForm
          open={openModal}
          setOpen={setOpenModal}
          userId={user.id}
          setCreated={setCreated}
        />
      </Container>
    </div>
  );
};
export default PostList;
