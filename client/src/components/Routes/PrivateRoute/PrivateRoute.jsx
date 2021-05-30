import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../../utils/isLoggedIn";

const PrivateRoute = ({ component: Component, user, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn(user)) {
          return (
            <Redirect
              to={{ pathname: "/auth/login", state: { from: props.location } }}
            />
          );
        }
        if (user && roles.indexOf(user?.user?.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
