import React from "react";
import Loadable from "react-loadable";
import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading
});

const ChangePassword = Loadable({
  loader: () => import("./views/ChangePassword"),
  loading: Loading
});

const ResetPassword = Loadable({
  loader: () => import("./views/ResetPassword"),
  loading: Loading
});

const ResetPassword2 = Loadable({
  loader: () => import("./views/ResetPassword/ResetPassword2"),
  loading: Loading
});

const Register = Loadable({
  loader: () => import("./views/Register"),
  loading: Loading
});

const Privileges = Loadable({
  loader: () => import("./views/Admin/Privileges"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/register", name: "Register", component: Register },
  { path: "/changepassword/:email?", name: "ChangePassword", component: ChangePassword },
  { path: "/resetpassword", name: "ResetPassword", component: ResetPassword },
  { path: "/resetpassword2/:token", name: "ResetPassword2", component: ResetPassword2 },

  { path: "/admin/privileges", name: "Privileges", component: Privileges }
];

export default routes;
