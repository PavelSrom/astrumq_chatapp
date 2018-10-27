import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Minimal date formatter library, alternative to Moment.js
import dayjs from 'dayjs';

const chatBubble = props => {
	const {
		type,
		message,
		onGetUserInfo,
		previousMessageSameSender,
	} = props;

	const avatar = '/images/avatar.png';

	// day.month.year | hour:minute
	const timeAdded = dayjs(message.timeAdded).format('DD.MM.YYYY | hh:mm');

	return (
		<div className={
			classNames({
				'chat-bubble': true,
				'chat-bubble--sent': type === 'sent',
				'chat-bubble--received': type === 'received',
			})}>
			<img
				src={avatar}
				className={
					classNames({
						'chat-bubble__avatar': true,
						'chat-bubble__avatar--hidden': previousMessageSameSender,
					})}
				alt=""/>
			<div className={
				classNames({
					'chat-bubble__content': true,
					'chat-bubble__content--sent': type === 'sent',
					'chat-bubble__content--received': type === 'received',
				})}>
				<span className={
					classNames({
						'chat-bubble__author': true,
						'chat-bubble__author--no-display': previousMessageSameSender,
					})}
							onClick={() => onGetUserInfo(message.author)}>
					{message.author}
				</span>
				<span className={
					classNames({
						'chat-bubble__message': true,
						'chat-bubble__message--sent': type === 'sent',
						'chat-bubble__message--received': type === 'received',
					})}>
					{message.text}
				</span>
				<span className="chatBubble__date">{timeAdded}</span>
			</div>
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
		timeAdded: PropTypes.number,
	}),

	// Defines type of message.
	// Sent message is aligned to the right, otherwise to the left
	type: PropTypes.oneOf(['sent', 'received']),
};

export default chatBubble;