import React, { Component } from "react";
import { useSelector } from "react-redux";
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
        console.log("AAAAAAA");
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
