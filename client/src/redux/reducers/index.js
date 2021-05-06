import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import notificationsReducer from "./notifications";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  notif: notificationsReducer,
});
