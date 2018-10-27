import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const redirectIfLoggedInRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={props => (
			rest.auth.uid ?
				<Redirect to="/chat"/>
				:
				<Component {...props} />
		)}/>
	)
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
});

export default connect(mapStateToProps)(redirectIfLoggedInRoute);