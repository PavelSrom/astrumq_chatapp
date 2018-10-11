import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../images/avatar.png';
import './UserDetailModal.css';
import Overlay from "../overlay/Overlay";

const userDetailModal = props => {
	const {
		user,
		onUserDetailsClosed,
		...attrs
	} = props;
	
	const {
		email,
		registrationTime,
		messages,
	} = user;
	
	return (
		<div className="UserDetailModal" {...attrs}>
			<div id="userDetails">
				<div className="header">
					<img src={avatar} alt=""/>
					<div className="email">{email}</div>
				</div>
				<div className="info">
					<div className="date-registered">
						<b>Datum registrace:</b>
						<span>{new Date(registrationTime).toLocaleDateString('cs-cz')}</span>
					</div>
					<div className="clearfix"/>
					<div className="message-count">
						<b>Počet zpráv:</b>
						<span>{messages}</span>
					</div>
					<div className="clearfix"/>
					<div className="close" onClick={onUserDetailsClosed}>
						Zavřít
					</div>
				</div>
			</div>
			<Overlay onClick={onUserDetailsClosed} />
			</div>
	);
};

userDetailModal.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string,
		messages: PropTypes.number,
		registrationTime: PropTypes.number
	}).isRequired,
	onUserDetailsClosed: PropTypes.func.isRequired
};

export default userDetailModal;