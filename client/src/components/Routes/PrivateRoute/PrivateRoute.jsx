import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../../utils/isLoggedIn";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!isLoggedIn()) {
          return (
            <Redirect
              to={{ pathname: "/auth/login", state: { from: props.location } }}
            />
          );
        }
        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        console.log("AAAAAAA");
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
