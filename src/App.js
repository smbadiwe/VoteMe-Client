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

// Containers
import { DefaultLayout } from "./containers";
// Pages
import {
  Login,
  Page404,
  Page500,
  Register,
  ChangePassword,
  ResetPassword,
  ResetPassword2
} from "./views";
import { PrivateRoute } from "./views/common";

// import { renderRoutes } from 'react-router-config';

const App = props => (
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      <Route exact path="/register" name="Register" component={Register} />
      <Route exact path="/resetpassword" name="Reset Password" component={ResetPassword} />
      <Route
        exact
        path="/resetpassword2/:token"
        name="Reset Password 2"
        component={ResetPassword2}
      />
      <Route exact path="/404" name="Page 404" component={Page404} />
      <Route exact path="/500" name="Page 500" component={Page500} />
      <PrivateRoute path="/" name="Home" component={DefaultLayout} />
    </Switch>
  </HashRouter>
);

export default App;
