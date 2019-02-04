import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LogIn from './pages/LogIn/LogIn'
import Dashboard from "./pages/Dashboard/Dashboard"
// import Sidebar from "./components/Sidebar";

const App = () => (
  <Router>
    <div>
      {/* <Sidebar /> */}
      <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/upload" component={Upload} />
        <Route exact path="/upload-success" component={UploadSuccess} />
        <Route exact path="/upload-user-input" component={NoReceipt} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

