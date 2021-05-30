import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";
const Search = ({ handleChange, handleSubmit, search, setSearch }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Search..."
            onChange={handleChange}
            value={search}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </form>
      </div>
    </>
  );
};

export default Search;
