import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser, suspendUser } from "../../../redux/actions";
import { makeRows } from "../../../utils/createTableRows";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import useStyles from "./styles";
const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const users = useSelector((state) => state?.users);
  const user = useSelector((state)=> state.user?.user);
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const form = useFormik({
    initialValues: {
      userId: null,
      validUntil: null,
      reason: "",
    },
    onSubmit: (values) => {
      dispatch(suspendUser(values));
      closeModal();
    },
  });

  const toggleModal = (id) => {
    form.values.userId = id;
    setOpen(!open);
  };

  const handleRemove = (id) => {
    if (
      window.confirm(
        "Do you really want to remove this user? This action cannot be undone"
      )
    ) {
      dispatch(removeUser(id));
    }
  };

  const rows = makeRows(users);
  const classes = useStyles();
  return (
    <TableContainer
      className={classes.container}
      component={Paper}
      size="large"
    >
      <Table className={classes} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Account creation date</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row" align="left">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">
              {user?.id !== row.id &&                <Button onClick={() => toggleModal(row.id)}>
                  {row.isSuspended ? "Unsuspend" : "Suspend"}
                </Button>}
              </TableCell>
              <TableCell align="center">
                {user?.id !== row.id &&<Button onClick={() => handleRemove(row.id)}>Remove</Button>}
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
        <DialogTitle>Please fill the form to suspend user</DialogTitle>

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

            <TextField
              id="validUntil"
              label="How long to suspend?"
              type="date"
              value={form.values.validUntil}
              onChange={form.handleChange}
              defaultValue={new Date()}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
    </TableContainer>
  );
};

export default UsersList;
