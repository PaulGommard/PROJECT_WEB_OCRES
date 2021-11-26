import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Widgets from "./pages/Widgets";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home}/>
        <Route path="/widgets" exact component={Widgets}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;
