import { Container, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions";
import PostList from "../PostList/PostList";
import useStyles from './styles'
const userId = JSON.parse(localStorage.getItem('currentUser')).id;
const UserPosts = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=> {
        dispatch(getUserProfile(userId))
    },[dispatch])

    return(
        <Container className={classes.container} >
            <Paper className={classes.paper}  elevation={3}>
                <h1 className={classes.h1}>Your posts</h1>
                <PostList viewProfile/>
            </Paper>
        </Container>
    )
    
}

export default UserPosts;