import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, isAuthorized } from "../AuthService";

function doRender(props, Component, componentName) {
  if (!isLoggedIn()) {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: "/login",
    //       state: { from: props.location }
    //     }}
    //   />
    // );
  }
  // Check if user is authorized to load this component
  console.log(componentName);
  if (isAuthorized(componentName)) {
    return <Component {...props} />;
  }

  return <h4>You're not authorized to request for this resource.</h4>;
}

const PrivateRoute = ({ component: Component, name: name, ...rest }) => (
  // <Route
  //   {...rest}
  //   render={props => {
  //     //console.log(Component.type.name);
  //     // if (!isLoggedIn()) {
  //     //   return (
  //     //     <Redirect
  //     //       to={{
  //     //         pathname: "/login",
  //     //         state: { from: props.location }
  //     //       }}
  //     //     />
  //     //   );
  //     // }
  //     //TODO: Check if user is authorized to load this component
  //     return <Component {...props} />;
  //   }}
  // />
  <Route name={name} {...rest} render={props => doRender(props, Component, name)} />
);

export default PrivateRoute;
