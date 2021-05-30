import { Switch } from "react-router";
import AdminDashboard from "../components/Admin/AdminDashboard";
import PostListAdmin from "../components/Admin/PostListAdmin/PostList";
import SuspendedComments from "../components/Admin/SuspendedComments/SuspendedComments";
import SuspendedPosts from "../components/Admin/SuspendedPosts/SuspendedPosts";
import SuspendedUsers from "../components/Admin/SuspendedUsers/SuspendedUsers";
import UsersList from "../components/Admin/UsersList/UsersList";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import JobsList from "../components/JobsList/JobsList";
import PostList from "../components/PostList/PostList";
import PrivateRoute from "../components/Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "../components/Routes/PublicRoute/PublicRoute";
import Tweets from "../components/Tweets/Tweets";
import UserPosts from "../components/UserPosts/UserPosts";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import { Role } from "../utils/Role";

export const Routes = (user) => {
  return (
    <Switch>
      <PrivateRoute
        path="/admin"
        roles={Role.Admin}
        component={AdminDashboard}
        exact
        user={user}
      />
      <PublicRoute restricted={false} exact path="/" component={PostList} />
      <PublicRoute
        restricted={false}
        exact
        path="/carrers"
        component={JobsList}
      />
      <PublicRoute restricted={true} path="/auth/login" component={Login} />
      <PublicRoute
        path="/auth/register"
        restricted={true}
        component={Register}
      />
      <PrivateRoute
        path="/admin/users"
        roles={Role.Admin}
        component={UsersList}
        user={user}
      />
      <PrivateRoute
        path="/admin/posts"
        roles={Role.Admin}
        component={PostListAdmin}
        user={user}
      />
      <PrivateRoute
        exact
        path="/admin/suspensions/post"
        roles={Role.Admin}
        component={SuspendedPosts}
        user={user}
      />
      <PrivateRoute
        exact
        path="/admin/suspensions/user"
        roles={Role.Admin}
        component={SuspendedUsers}
        user={user}
      />
      <PrivateRoute
        exact
        path="/admin/suspensions/comments"
        roles={Role.Admin}
        component={SuspendedComments}
        user={user}
      />
      <PublicRoute path="/user/:id" component={ViewProfile} />
      <PrivateRoute
        path="/myposts"
        roles={[Role.Admin, Role.User]}
        component={UserPosts}
        user={user}
      />
      <PublicRoute path="/tweets" component={Tweets} />
    </Switch>
  );
};
