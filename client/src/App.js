import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import PostList from "./components/PostList/PostList";
import JobsList from "./components/JobsList/JobsList";
import PublicRoute from "./components/Routes/PublicRoute/PublicRoute";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
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
            <PublicRoute restricted={true} component={Register} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
