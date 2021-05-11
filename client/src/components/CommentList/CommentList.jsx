import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import Comment from "./Comment/Comment";

const Comments = ({ comments, post, open }) => {
  return (
    <Dialog aria-labelledby="post-create-modal" open={open}>
      <DialogTitle>Comments for {post.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {comments.length > 0
            ? comments.map((comment) => <Comment comment={comment} />)
            : "No comments :("}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default Comments;
