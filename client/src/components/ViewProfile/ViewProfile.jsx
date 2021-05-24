import { Container, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useParams } from "react-router"
import { getUserProfile } from "../../redux/actions";
import { isLoggedIn } from "../../utils/isLoggedIn";
import PostList from "../PostList/PostList";
import ProfileDetails from "./components/ProfileDetails";
import useStyles from './styles'
const ViewProfile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state?.communication?.user );
    const loggedInUser = useSelector((state)=> state?.user?.user);
    const classes = useStyles();
    useEffect(()=> {
        dispatch(getUserProfile(id,loggedInUser.id))
    },[dispatch,id])

    if(!isLoggedIn(loggedInUser)){
        return <Redirect to='/'/>
    }
    return(
        <Container className={classes.container} maxWidth="md" >
            <Paper style={{paddingBottom: '4em'} }elevation={3}>
                <ProfileDetails user={user}/>
                <h1 className={classes.h1}>{user?.firstName} posts</h1>
                <PostList viewProfile />
            </Paper>

        </Container>
    )


}

export default ViewProfile;