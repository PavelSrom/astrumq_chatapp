import React from 'react';
import {Redirect, Route} from "react-router";
import PropTypes from 'prop-types';

const privateRoute = ({component: Component, ...rest}) => {
	return (<Route {...rest} render={props => (
		rest.isUserAuthenticated ?
			<Component {...props}/>
			:
			<Redirect to="/" />
	)}/>)
};

privateRoute.propTypes = {
	component: PropTypes.func,
	isUserAuthenticated: PropTypes.bool
}

export default privateRoute;