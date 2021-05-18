import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComent } from "../../redux/actions";
import Comment from "./Comment/Comment";

const Comments = ({ comments, post, open, setOpen, created, user }) => {
  const toggleModal = (open) => setOpen(!open);
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      content: "",
      postId: post?.id,
    },
    onSubmit: (values) => {
      dispatch(addComent(values));
      created(new Date());
    },
  });
  return (
    <Dialog
      aria-labelledby="post-create-modal"
      open={open}
      onClose={toggleModal}
    >
      <DialogTitle>Comments for {post.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {comments.length > 0
            ? comments.map((comment) => (
                <Comment comment={comment} postId={post.id} update={created} />
              ))
            : "No comments :("}
        </DialogContentText>
        <form action="">
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Add a comment"
            type="text"
            fullWidth
            onChange={form.handleChange}
            value={form.values.content}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: "black" }}
          onClick={form.submitForm}
          color="primary"
        >
          Create comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Comments;
