export const checkIfUserIsFollowed = (followList, userToCheck) => {
    if(!followList || !userToCheck){
        return null;
    }

    for(let i = 0; i < followList.length; i++){
        let followee = followList[i];

        if(followee.username === userToCheck){
            return true;
        }
    }
    return false;
}