import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  card: {
      marginBottom: '1em',
      color: 'black',
  },
  button: {
    fontSize: '30px',
    border: '1px solid 	#B0B0B0'
  },
  title: {
    '& .MuiCardHeader-title':{
      fontSize: '40px',
      color: 'black',
      fontWeight: 'bolder',
    },
    label: {
      textTransform: 'capitalize',
    },
  }
}));