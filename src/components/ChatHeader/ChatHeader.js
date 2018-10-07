import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo_astrumq.png';
import avatar from '../../images/avatar_big.png';
import './ChatHeader.css';

const chatHeader = props => (
	<header className="ChatHeader">
		<div className="container">
			<div className="left">
				<img src={logo} alt=""/>
			</div>
			<div className="right">
				<img className="left avatar" src={avatar} alt=""/>
				<div className="left account">
					{props.userEmail}
				</div>
				<span className="left"><div onClick={props.onSignOut} className="logout"></div></span>
			</div>
		</div>
	</header>
);

chatHeader.propTypes = {
	// User email that is taken from the currently logged user
	userEmail: PropTypes.string,
	
	// Event which will sign the user out and redirect the web app on the login screen
	onSignOut: PropTypes.func
}

export default chatHeader;