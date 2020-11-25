import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  console.log("App rendereds");
  return (
    <Router>
      <Switch>
        {/* Home page - Dashboard*/}
        <Route path="/" exact={true}>
          <Dashboard></Dashboard>
        </Route>
        {/* Login page - Login */}
        <Route path="/login">
          <Login></Login>
        </Route>
        {/* Wrong path - Error */}
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
