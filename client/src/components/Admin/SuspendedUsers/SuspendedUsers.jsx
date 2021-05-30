import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuspendedUsers,
  removeUser,
  unsuspendUser,
} from "../../../redux/actions";
import { makeRows } from "../../../utils/createTableRows";

const SuspendedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuspendedUsers());
  }, [dispatch]);
  const suspendedUsers = useSelector((state) => state?.suspendedUsers);
  const handleUnsuspend = (id) => {
    if (window.confirm("Do you really want to unsuspend this user?")) {
      dispatch(unsuspendUser(id));
    }
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
  const rows = makeRows(suspendedUsers);
  return (
    <TableContainer component={Paper} size="large">
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Account creation date</TableCell>
              <TableCell align="center">Reason for suspension</TableCell>
              <TableCell align="center">Suspended by</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row?.firstName}</TableCell>
                <TableCell align="center">{row?.lastName}</TableCell>
                <TableCell align="center">{row?.username}</TableCell>
                <TableCell align="center">{row?.createdAt}</TableCell>
                <TableCell align="center">{row?.reason}</TableCell>
                <TableCell align="center">
                  {row.admin?.firstName + " " + row.admin?.lastName}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleUnsuspend(row.id)}>
                    Unsuspend
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleRemove(row.id)}>
                    Remove user
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default SuspendedUsers;
