
import {makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Header from "./components/Header";
import Coin from "./pages/Coin";
import Home from "./pages/Home";

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }))
  const classes = useStyles()
  return (
    <Router>
     <div className={classes.App}>
      <Header></Header>
    <Routes>
        <Route exact path = "/" element= {<Home />}/>
        <Route path = "/coins/:id" element = {<Coin />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
