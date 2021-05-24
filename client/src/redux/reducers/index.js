import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import notificationsReducer from "./notifications";
import adminReducer from "./admin";
import suspendedPost from "./suspendedPost";
import suspendedComments from "./suspendedComments";
import communication from "./communication"
import tweets from "./tweet"
import suspendedUsers from './suspendedUsers'
export default combineReducers({
  user: userReducer,
  posts: postReducer,
  notif: notificationsReducer,
  users: adminReducer,
  suspendedPosts: suspendedPost,
  suspendedComments: suspendedComments,
  communication: communication,
  tweets: tweets,
  suspendedUsers: suspendedUsers
});
