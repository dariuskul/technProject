import FilterTab from "./FilterTab";
import useStyles from "./styles";
const Filter = () => {
  const classes = useStyles();
  return (
    <div className={classes.filter}>
      <FilterTab title="Users" count={0} path={"/admin/users"} />
      <FilterTab title="Posts" count={0} path={"/admin/posts"} />
    </div>
  );
};

export default Filter;
