import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: '1em',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid black'
    },
    button: {
        color: 'black',
        fontSize: '20px',
        fontWeight: 'bolder'

    }
    
}));
