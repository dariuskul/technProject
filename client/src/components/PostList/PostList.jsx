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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
const posts = [
  {
    creator: "Test1",
    title: "My little ponny",
    description: "My little ponny",
    createdAt: "2017-08-09",
  },
  {
    creator: "Test1",
    title: "My little ponny",
    description: "My little ponny and someone",
    createdAt: "2017-08-09",
  },
];

const PostList = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = (openModal) => setOpenModal(!openModal);
  const user = useSelector((state) => state.user);
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
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Post
              title={posts[0].title}
              description={posts[0].description}
              createdAt={posts[0].createdAt}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Post
              title={posts[0].title}
              description={posts[1].description}
              createdAt={posts[1].createdAt}
            />
          </Grid>
        </Grid>
        <Dialog
          onClose={toggleModal}
          aria-labelledby="simple-dialog-title"
          open={openModal}
          className={classes.modal}
        >
          <DialogTitle>Create new post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill the form below to create your own post!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Post title"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Write what you think..."
              multiline
              rows={4}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {}} color="primary">
              Create post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};
export default PostList;
