import React from 'react';
import PropTypes from 'prop-types';

import {  Navigate } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,children
    //component: Component,
    //...rest
}) => {

    return (
        // <Route { ...rest }
        //     component={ (props) => (
                ( isAuthenticated )
                    ? ( <Navigate to="/" /> )
                    : children//( <Component { ...props } /> )
        //     )}
        
        // />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    //component: PropTypes.func.isRequired
}
