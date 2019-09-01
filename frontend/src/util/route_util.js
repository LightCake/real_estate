import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Destructuring with renaming
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the tweets page if the user is authenticated
        <Redirect to="/" />
      )
    }
  />
);

const Protected = ({
  component: Component,
  path,
  exact,
  loggedIn,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the login page if the user is not authenticated
        <Redirect to="/login" />
      )
    }
  />
);

// Use the isAuthenticated slice of state to determine whether a user is logged in
const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
