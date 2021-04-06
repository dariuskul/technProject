import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../../utils/isLoggedIn';

 const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => {
            if (!isLoggedIn()) {
                return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />


    )
}

export default PrivateRoute;