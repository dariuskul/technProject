import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchSuspendedPosts,
  fetchSuspendedUsers,
  fetchUsers,
} from "../../../redux/actions";
import FilterTab from "./FilterTab";
import useStyles from "./styles";
const Filter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchSuspendedPosts());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const suspended = useSelector((state) => state.suspendedPosts);
  return (
    <div className={classes.filter}>
      <FilterTab title="Users" count={users.length} path={"/admin/users"} />
      <FilterTab title="Posts" count={posts.length} path={"/admin/posts"} />
      <FilterTab
        title="Post suspensions"
        count={suspended.length}
        path={"/admin/suspensions/post"}
      />
      <FilterTab
        title="User suspensions"
        count={0}
        path={"/admin/suspensions/user"}
      />
      <FilterTab
        title="Comments suspensions"
        count={0}
        path={"/admin/posts/suspensions"}
      />
    </div>
  );
};

export default Filter;
