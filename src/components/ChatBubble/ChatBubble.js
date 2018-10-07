import * as React from 'react';
import PropTypes from 'prop-types';
import avatar from "../../images/avatar.png";

const chatBubble = props => {
	const {
		type,
		message,
		onGetUserInfo,
		...attrs
	} = props;
	
	return (
		<div className="clearfix" {...attrs}>
			<div className={`col-md-3 relative ${type === 'sent' ? 'right' : 'left'}`}>
				<img className={`mrg-10 ${type === 'sent' ? 'left mgl-10' : 'right mgr-10'}`} src={avatar}
				     alt=""/>
			</div>
			<div className={`col-md-9 ${type === 'sent' ? 'right' : 'left'}`}>
				<div onClick={() => onGetUserInfo(message.author)}
				     className="user-detail">{message.author}</div>
				<div className="box">
					<div className="text">{message.text}</div>
					<div className="date">{new Date(message.timeAdded).toLocaleDateString('cs-cz')}</div>
				</div>
			</div>
			<div className={`col-md-3 ${type === 'sent' ? 'left' : 'right'}`}/>
		</div>
	)
};

chatBubble.propTypes = {
	// Event handler that gets fired when user clicks an author's email
	onGetUserInfo: PropTypes.func,
	
	// Message received from firebase realtime database
	message: PropTypes.shape({
		author: PropTypes.string,
		message: PropTypes.string,
		timeAdded: PropTypes.number
	}),
	
	// Defines type of message.
	// Sent message is aligned to the right, otherwise to the left
	type: PropTypes.oneOf(['sent', 'received'])
}

export default chatBubble;