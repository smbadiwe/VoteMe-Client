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

const Privileges = Loadable({
  loader: () => import("./views/Admin/Privileges"),
  loading: Loading
});

const Users = Loadable({
  loader: () => import("./views/Admin/Users"),
  loading: Loading
});

const AddEditUser = Loadable({
  loader: () => import("./views/Admin/Users/AddEditUser"),
  loading: Loading
});

const UserRoles = Loadable({
  loader: () => import("./views/Admin/UserRoles"),
  loading: Loading
});

const AddEditUserRole = Loadable({
  loader: () => import("./views/Admin/UserRoles/AddEditUserRole"),
  loading: Loading
});

// const routes: These are the routes that will be launched from inside the Layout (shell)
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: "/", exact: true, name: "Home", component: DefaultLayout, allowAnonymous: true },
  {
    id: 1,
    path: "/changepassword",
    exact: true,
    name: "ChangePassword",
    component: ChangePassword
  },
  { id: 2, path: "/dashboard", name: "Dashboard", component: Dashboard },
  { id: 3, path: "/admin/privileges", name: "Privileges", component: Privileges },
  { id: 4, path: "/admin/users", name: "Users", component: Users },
  { id: 5, path: "/admin/users/addedit/:id?", name: "AddEditUser", component: AddEditUser },
  { id: 6, path: "/admin/userroles", name: "UserRoles", component: UserRoles },
  {
    id: 7,
    path: "/admin/userroles/addedit/:id?",
    name: "AddEditUserRole",
    component: AddEditUserRole
  }
];

export default routes;
