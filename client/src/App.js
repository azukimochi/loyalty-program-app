import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LogIn from './pages/LogIn/LogIn'
import Dashboard from "./pages/Dashboard/Dashboard"

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  </Router>
);

export default App;

