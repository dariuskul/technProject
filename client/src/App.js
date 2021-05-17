import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import PostList from "./components/PostList/PostList";
import JobsList from "./components/JobsList/JobsList";
import PublicRoute from "./components/Routes/PublicRoute/PublicRoute";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import PrivateRoute from "./components/Routes/PrivateRoute/PrivateRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { Role } from "./utils/Role";
import UsersList from "./components/Admin/UsersList/UsersList";
import PostListAdmin from "./components/Admin/PostListAdmin/PostList";
//localStorage.removeItem('currentUser')
function App() {
  const notifs = useSelector((state) => state?.notif?.notifications);
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        {notifs && <h1>{notifs}</h1>}
        <Container maxWidth="lg">
          <Switch>
            <PrivateRoute
              path="/admin"
              roles={Role.Admin}
              component={AdminDashboard}
              exact
            />
            <PublicRoute
              restricted={false}
              exact
              path="/"
              component={PostList}
            />
            <PublicRoute
              restricted={false}
              exact
              path="/carrers"
              component={JobsList}
            />
            <PublicRoute
              restricted={true}
              path="/auth/login"
              component={Login}
            />
            <PublicRoute
              path="/auth/register"
              restricted={true}
              component={Register}
            />
            <PrivateRoute
              path="/admin/users"
              roles={Role.Admin}
              component={UsersList}
            />
            <PrivateRoute
              path="/admin/posts"
              roles={Role.Admin}
              component={PostListAdmin}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
