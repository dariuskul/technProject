import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import PostList from "./components/PostList/PostList";
import JobsList from "./components/JobsList/JobsList";
import PublicRoute from "./components/Routes/PublicRoute/PublicRoute";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/Routes/PrivateRoute/PrivateRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { Role } from "./utils/Role";
import UsersList from "./components/Admin/UsersList/UsersList";
import PostListAdmin from "./components/Admin/PostListAdmin/PostList";
//localStorage.removeItem('currentUser')
import "./App.css";
import SuspendedPosts from "./components/Admin/SuspendedPosts/SuspendedPosts";
import SuspendedUsers from "./components/Admin/SuspendedUsers/SuspendedUsers";
import SuspendedComments from "./components/Admin/SuspendedComments/SuspendedComments";
import Notifier from "./components/Notifier/Notifier";
import { Routes } from "./helpers/Routes";
function App() {
  return (
    <div className="app">
      <Notifier/>
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="lg">
            <Routes/>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
