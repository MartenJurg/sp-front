import decode from "jwt-decode";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import React from "react";


export const logout = () => {
    localStorage.removeItem('token')
    window.location.reload(true);
}

export const checkUser = requireAdmin => {
    const token = localStorage.getItem('token');

    if (!token) {
        return false
    }

    try {
        const { exp, role } = decode(token);
        if (exp < new Date().getTime() / 1000 ) {
            logout()
            return false
        }

        if (requireAdmin) {
            if (role.role !== 'ROLE_ADMIN') return false
        } else {
            if (!(role.role === 'ROLE_REGULAR_USER' || role.role === 'ROLE_ADMIN')) return false
        }
    } catch (e) {
        console.log(e)
        return false
    }

    return true
}

export const UserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkUser(false) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

export const NonUserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkUser(false) ? (
            <Redirect to={{pathname: '/profiil'}}/>
        ) : (
            <Component {...props} />
        )
    )}/>
)

export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkUser(true) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)