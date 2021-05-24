import { useSelector } from "react-redux";

export const isLoggedIn = (user) => {
    if (user) {
        return true;
    }

    return false;
}