import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./scss/style.css";

// Pages
import {
  Login,
  Page404,
  Page500,
  Register,
  VerifyUser,
  ResetPassword,
  ResetPassword2,
  Home
} from "./views";
import { PrivateRoute } from "./views/common";
import { DefaultLayout } from "./containers";

const App = props => (
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      <Route exact path="/register" name="Register" component={Register} />
      <Route exact path="/verifyuser" name="Register" component={VerifyUser} />
      <Route exact path="/resetpassword" name="ResetPassword" component={ResetPassword} />
      <Route
        exact
        path="/resetpassword2/:token"
        name="Reset Password 2"
        component={ResetPassword2}
      />
      <Route exact path="/404" name="Page404" component={Page404} />
      <Route exact path="/500" name="Page500" component={Page500} />
      <Route path="/" name="Home" component={Home} />
      <PrivateRoute path="/dashboard" name="Dashboard" component={DefaultLayout} />
    </Switch>
  </HashRouter>
);

export default App;
