import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const privateRoute = ({component: Component, ...rest}) => {
	return (<Route {...rest} render={props => (
		rest.auth.uid ?
			<Component {...props}/>
			:
			<Redirect to="/" />
	)}/>)
};

privateRoute.propTypes = {
	component: PropTypes.func,
	isUserAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

export default connect(mapStateToProps)(privateRoute);