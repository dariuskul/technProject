import { useHistory } from "react-router";
import useStyles from "./styles";
const FilterTab = ({ title, count, path }) => {
  const { push } = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.filterTab} onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;
