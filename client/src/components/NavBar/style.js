import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "0",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: "white"
  },
  heading: {
    marginLeft: '0.5em',
    textDecoration: 'none',
    color: 'black',
    fontSize: '50px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    '& $span': {
        color: 'red'
    }

  },
  buttons:{
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  alert: {
    alignItems: 'center'
  },
  button:{
      minHeight: '50px',
      color: 'black',
      fontSize: "20px",
      fontFamily: ['"Roboto"', 'sans sherif'].join(','),
      margin: '0px 0px 0px 20px',
      border: 'none',
      backgroundColor: 'white',
      boxShadow: 'none',
      fontWeight: '1000'
  }
}));