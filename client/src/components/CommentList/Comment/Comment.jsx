import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { suspendComment } from "../../../redux/actions";
import useStyles from "./style";
const Comment = ({ comment, update }) => {
  const classes = useStyles();
  const creator = comment?.user.firstName + " " + comment?.user.lastName;
  const commentContent = comment.content;
  const createdAt = new Date(comment.createdAt).toISOString().split("T")[0];
  const user = useSelector((state) => state?.user?.user);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpen(false);
  };
  const form = useFormik({
    initialValues: {
      commentId: null,
      reason: "",
    },
    onSubmit: (values) => {
      dispatch(suspendComment(values, comment.postId));
      update(new Date());
    },
  });

  const toggleModal = (id) => {
    form.values.commentId = comment.id;
    setOpen(!open);
  };
  return (
    <div className={classes.commentWrapper}>
      <div className={classes.header}>
        <h1 className={classes.h1}>{creator}</h1>
        <h2 className={classes.h1}>{createdAt}</h2>
        {user?.role === "Admin" && (
          <Button onClick={toggleModal}>Suspend</Button>
        )}
      </div>
      <Dialog
        onClose={closeModal}
        aria-labelledby="post-create-modal"
        open={open}
      >
        <DialogTitle>Please provide reason</DialogTitle>

        <DialogContent>
          <form className={classes.form}>
            <Select
              native
              id="reason"
              value={form.values.reason}
              onChange={form.handleChange}
              input={<Input id="demo-dialog-native" />}
              className={classes.reason}
            >
              <option aria-label="None" value="">
                Select reason
              </option>
              <option value={"Fraud"}>Fraud</option>
              <option value={"Inappropriate"}>Inappropriate</option>
              <option value={"Violence"}>Violence</option>
              <option value={"Spam"}>Spam</option>
              <option value={"Hate speech"}>Hate speech</option>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={form.submitForm}>
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.content}>{commentContent}</div>
    </div>
  );
};

export default Comment;
