import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";
import { ErrorBoundary, PrivateRoute } from "../../views/common";
import { isLoggedIn } from "../../views/common/AuthService";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  getNavRoutesForUser(allNavRoutes, componentsForUser) {
    const userNavRoutes = [];

    this.populateUserRoutes(allNavRoutes, userNavRoutes, componentsForUser);
    return userNavRoutes;
  }
  populateUserRoutes(allNavRoutes, userNavRoutes, componentsForUser) {
    for (const navRoute in allNavRoutes) {
      if (navRoute.divider === true) continue;

      if (navRoute.children && navRoute.children.length > 0) {
        this.populateUserRoutes(navRoute.children, userNavRoutes, componentsForUser);
      } else {
        userNavRoutes.push(navRoute);
      }
    }
  }
  getRouteComponent(route, idx) {
    if (!route || !route.component) return null;

    if (route.allowAnonymous)
      return (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          component={route.component}
        />
      );

    return (
      <PrivateRoute
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        component={route.component}
      />
    );
  }

  render() {
    if (!isLoggedIn()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
    }
    const userNavs = this.getNavRoutesForUser(navigation);
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={userNavs} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <ErrorBoundary>
              <Container fluid>
                <Switch>{routes.map(this.getRouteComponent)}</Switch>
              </Container>
            </ErrorBoundary>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
