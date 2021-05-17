import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import notificationsReducer from "./notifications";
import adminReducer from "./admin";
import suspendedPost from "./suspendedPost";
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  notif: notificationsReducer,
  users: adminReducer,
  suspendedPosts: suspendedPost,
});
