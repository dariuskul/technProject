import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    padding: "20px 20px",
    marginTop: theme.spacing(10),
    border: '1px solid #eaeaeb'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: "30px ",
    padding: "10px",

  },
  button: {
    width: '100%',
    alignItems: 'center',
    color: 'white',
    fontWeight: '1000'
  },
  typography:{
    color: 'black',
    fontSize: '35px ',
    fontWeight: 'bold'
  }
}));