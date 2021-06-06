import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../../utils/isLoggedIn";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn() && restricted) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
