import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import PostList from "./components/PostList/PostList";

function App() {
  return (
    <div>
      <BrowserRouter>
      <CssBaseline/>
      <NavBar/>
      <Container maxWidth="lg">    
      <Switch>
        <Route exact path='/' component={PostList}/>
        <Route path='/auth/login' component={Login}/>
        <Route path='/auth/register' component={Register}/>
      </Switch>
      </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
