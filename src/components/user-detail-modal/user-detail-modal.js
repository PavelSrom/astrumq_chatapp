import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Overlay from '../overlay/overlay';

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

	const avatar = '/images/avatar.png';
	
	return (
		<div className="user-detail-modal" {...attrs}>
			<div className="user-detail-modal__content">
				<div className="user-detail-modal__header">
					<img className="user-detail-modal__avatar" src={avatar} alt=""/>
					<div className="user-detail-modal__email">{email}</div>
				</div>
				<div className="user-detail-modal__info">
					<div className="user-detail-modal__inner-content user-detail-modal__registrationDate">
						<b>Datum registrace:</b>
						<span>{new Date(registrationTime).toLocaleDateString('cs-cz')}</span>
					</div>
					<div className="user-detail-modal__inner-content user-detail-modal__numberOfMessages">
						<b>Počet zpráv:</b>
						<span>{messages}</span>
					</div>
					<Button className="user-detail-modal__inner-content user-detail-modal__close" color="secondary"
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
		registrationTime: PropTypes.number,
	}).isRequired,
	onUserDetailsClosed: PropTypes.func.isRequired,
};

export default userDetailModal;