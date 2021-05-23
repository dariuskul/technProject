import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { follow } from '../../../redux/actions';
import { checkIfUserIsFollowed } from '../../../utils/checkIfCurrentUserFollows';
import useStyles from './styles'

const checkIfViewingOwnProfile = (loggedInUserId, userId) => {
    if (loggedInUserId === userId) {
        return true;
    }
    return false;
}


const ProfileDetails = ({ user }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const name = user?.firstName + ' ' + user?.lastName;
    const loggedInUser = useSelector((state) => state.user?.user?.id);
    const followedList = useSelector((state) => state?.communication?.followers);
    if (!user) {
        return null;
    }
    const handleFollow = () => {
        const form = {
            followeeId: user.id
        }
        dispatch(follow(form,user.username))
    }

    console.log(followedList)
    let isFollowing = checkIfUserIsFollowed(followedList, user?.username);
    return (
        <div className={classes.container}>
            <h2>{name && name}</h2>
            {(loggedInUser && !checkIfViewingOwnProfile(loggedInUser, user?.id)) && 
            <Button onClick={handleFollow} className={classes.button}>{isFollowing ? 'UNFOLLOW' : 'FOLLOW'}</Button>}
        </div>
    )
}

export default ProfileDetails;