import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUsers } from "../../../redux/actions";
import FilterTab from "./FilterTab";
import useStyles from "./styles";
const Filter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  return (
    <div className={classes.filter}>
      <FilterTab title="Users" count={users.length} path={"/admin/users"} />
      <FilterTab title="Posts" count={posts.length} path={"/admin/posts"} />
      <FilterTab
        title="Post suspensions"
        count={0}
        path={"/admin/posts/suspensions"}
      />
      <FilterTab
        title="User suspensions"
        count={0}
        path={"/admin/posts/suspensions"}
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
