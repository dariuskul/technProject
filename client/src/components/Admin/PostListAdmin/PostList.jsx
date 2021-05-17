import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePost, suspendPost } from "../../../redux/actions";
import { makeRows } from "../../../utils/createTableRows";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Select,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import { useFormik } from "formik";
const PostListAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const classes = useStyles();
  const posts = useSelector((state) => state?.posts);
  const rows = makeRows(posts);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const form = useFormik({
    initialValues: {
      postId: "",
      reason: "",
    },
    onSubmit: (values) => {
      if (action === "suspend") {
        dispatch(suspendPost(values));
        closeModal();
      }
      if (action === "remove") {
        dispatch(removePost(values.postId));
        closeModal();
      }
    },
  });
  const closeModal = () => {
    setOpen(false);
  };
  const toggleModal = (id, action = "") => {
    form.values.postId = id;
    setAction(action);
    setOpen(!open);
  };
  return (
    <TableContainer
      className={classes.container}
      component={Paper}
      size="large"
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Post id &nbsp;</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Content</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Creator</TableCell>
            <TableCell align="center">Post created at</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="left">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
              <TableCell align="left">
                <img
                  style={{ maxWidth: "200px" }}
                  src={row.photoUrl}
                  alt="post "
                />
              </TableCell>
              <TableCell align="left">
                {row.user.firstName + " " + row.user.lastName}
              </TableCell>
              <TableCell align="left">{row.createdAt}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => toggleModal(row.id, "suspend")}
                  style={{ color: "red" }}
                >
                  Suspend
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => toggleModal(row.id, "remove")}
                  style={{ color: "red" }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        onClose={closeModal}
        aria-labelledby="post-create-modal"
        open={open}
      >
        <DialogTitle>Please select reason</DialogTitle>

        <DialogContent>
          <form>
            <Select
              native
              id="reason"
              value={form.values.reason}
              onChange={form.handleChange}
              input={<Input id="demo-dialog-native" />}
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
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={form.submitForm}>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
export default PostListAdmin;
