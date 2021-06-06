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
  fetchSuspendedPosts,
  removePost,
  unsuspendPost,
} from "../../../redux/actions";
import { makeRows } from "../../../utils/createTableRows";
import useStyles from "../styles";
const SuspendedPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuspendedPosts());
  }, [dispatch]);
  const classes = useStyles();
  const suspendedPosts = useSelector((state) => state.suspendedPosts);
  const rows = makeRows(suspendedPosts);

  const handleUnsuspend = (id) => {
    if (window.confirm("Do you really want to unsuspend this post?")) {
      dispatch(unsuspendPost(id));
    }
  };

  const handleRemove = (id) => {
    if (
      window.confirm(
        "Do you really want to remove this post? This action cannot be undone"
      )
    ) {
      dispatch(removePost(id));
    }
  };
  return (
    <TableContainer
      className={classes.container}
      component={Paper}
      size="large"
    >
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Post id &nbsp;</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Content</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Creator</TableCell>
              <TableCell align="center">Post created at</TableCell>
              <TableCell align="center">Suspension reason</TableCell>
              <TableCell align="center">Suspended by</TableCell>
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
                  {row.creator.firstName + " " + row.creator.lastName}
                </TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">{row.reason}</TableCell>
                <TableCell align="left">
                  {row.admin.firstName + " " + row.admin.lastName}
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{ color: "red" }}
                    onClick={() => handleUnsuspend(row.id)}
                  >
                    Unsuspend
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{ color: "red" }}
                    onClick={() => handleRemove(row.id)}
                  >
                    Remove
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

export default SuspendedPosts;
