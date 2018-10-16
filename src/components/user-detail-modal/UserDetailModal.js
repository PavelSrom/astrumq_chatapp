import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
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
		<div className="userDetailModal" {...attrs}>
			<div className="userDetailModal__content">
				<div className="userDetailModal__header">
					<img className="userDetailModal__avatar" src={avatar} alt=""/>
					<div className="userDetailModal__email">{email}</div>
				</div>
				<div className="userDetailModal__info">
					<div className="userDetailModal__innerContent userDetailModal__registrationDate">
						<b>Datum registrace:</b>
						<span>{new Date(registrationTime).toLocaleDateString('cs-cz')}</span>
					</div>
					<div className="userDetailModal__innerContent userDetailModal__numberOfMessages">
						<b>Počet zpráv:</b>
						<span>{messages}</span>
					</div>
					<Button className="userDetailModal__innerContent userDetailModal__close" color="secondary"
					        onClick={onUserDetailsClosed}>
						Zavřít
					</Button>
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