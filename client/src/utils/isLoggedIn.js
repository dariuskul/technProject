export const isLoggedIn = () => {
    if (localStorage.getItem('currentUser')) {
        return true;
    }

    return false;
}