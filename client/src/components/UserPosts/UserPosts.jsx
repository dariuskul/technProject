import { Container, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions";
import PostList from "../PostList/PostList";
import useStyles from './styles'
const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
const UserPosts = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=> {
        if(userId)
        dispatch(getUserProfile(userId))
    },[dispatch])
    const posts = useSelector((state)=> state?.posts);
    return(
        <Container className={classes.container} >
         {posts ? <Paper className={classes.paper}  elevation={3}>
                <h1 className={classes.h1}>Your posts</h1>
                <PostList viewProfile/>
            </Paper> : 'Loading...'}
            
        </Container>
    )
    
}

export default UserPosts;