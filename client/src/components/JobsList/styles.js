import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  container:{
      marginTop: '4em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  },
  sorting:{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '1em',
    '& .MuiInputLabel-root':{
      marginRight: '1em',
      fontSize: '25px',
      color: 'black',
      fontWeight: 'bolder'
    },
    '& .MuiSelect-root':{
      fontSize: '50px',
      color: 'black',
    },
  },
  jobButton: {
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bolder'
  }

}));