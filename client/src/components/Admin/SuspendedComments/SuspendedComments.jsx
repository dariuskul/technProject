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
import { fetchSuspendedComments } from "../../../redux/actions";
import { makeRows } from "../../../utils/createTableRows";

const SuspendedComments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuspendedComments());
  }, [dispatch]);
  const suspendedComments = useSelector((state) => state.suspendedComments);

  const rows = makeRows(suspendedComments);
  const handleRemove = (id) => {};

  const handleUnsuspend = (id) => {};
  return (
    <TableContainer component={Paper} size="large">
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                color: "black",
                fontSize: "20px",
                fontWeight: "bolder",
              }}
            >
              <TableCell align="center">Comment id</TableCell>
              <TableCell align="center">Creator of the comment</TableCell>
              <TableCell align="center">Comment creation date</TableCell>
              <TableCell align="center">Reason for suspension</TableCell>
              <TableCell align="center">Suspended by</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  {row?.creator.firstName + " " + row?.creator.lastName}
                </TableCell>
                <TableCell align="center">{row?.createdAt}</TableCell>
                <TableCell align="center">{row?.reason}</TableCell>
                <TableCell align="center">
                  {row.admin?.firstName + " " + row.admin?.lastName}
                </TableCell>
                <TableCell align="center">{row?.content}</TableCell>
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

export default SuspendedComments;
