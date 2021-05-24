import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
//localStorage.removeItem('currentUser')
import "./App.css";
import Notifier from "./components/Notifier/Notifier";
import { Routes } from "./helpers/Routes";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state)=> state?.user?.user)
  return (
    <div className="app">
      <Notifier/>
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="lg">
            <Routes user={user}/>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
