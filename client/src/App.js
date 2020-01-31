import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Link to="/" className="nav-links">
          Login
        </Link>
        <Link to="/bubbles" className="nav-links">
          Bubbles
        </Link>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/bubbles" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
