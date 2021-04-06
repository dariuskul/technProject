import React, { Component } from 'react';
import { Route, Redirect,useLocation } from 'react-router-dom';
import { isLoggedIn } from '../../../utils/isLoggedIn';

const PublicRoute = ({component: Component,restricted, ...rest}) => {
    const { pathname } = useLocation();
    console.log(pathname)
    return(
        <Route {...rest} render={props => {
            if (isLoggedIn() && restricted) {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />

    )
}

export default PublicRoute;