import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  container:{
      marginTop: '4em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  circular:{
    display: 'flex',
    textAlign: 'center'
  },
  button:{
    marginBottom: '1em',
    marginTop: '1em',
    width: '100%',
    color: 'black',
    backgroundColor: 'white'
  }
}));