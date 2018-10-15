import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import avatar from "../../images/avatar.png";
import './ChatBubble.css';

const chatBubble = props => {
	const {
		type,
		message,
		onGetUserInfo,
		previousMessageSameSender,
	} = props;
	
	let timeAdded = new Date(message.timeAdded);
	
	// dd.mm.YYYY | HH:MM
	timeAdded = `${timeAdded.getDay()}.${timeAdded.getMonth()}.${timeAdded.getFullYear()} | ${timeAdded.getHours()}:${timeAdded.getMinutes()}`;
	
	const chatBubbleClassnames = {
		'chatBubble': classNames(
			'chatBubble',
			{
				'chatBubble--sent': type === 'sent',
				'chatBubble--received': type === 'received'
			}
		),
		
		'chatBubbleContent': classNames(
			'chatBubble__content',
			{
				'chatBubble__content--sent': type === 'sent',
				'chatBubble__content--received': type === 'received'
			}
		),
		
		'chatBubbleAvatar': classNames(
			'chatBubble__avatar',
			{
				'chatBubble__avatar--hidden': previousMessageSameSender
			}
		),
		
		'chatBubbleMessage': classNames(
			'chatBubble__message',
			{
				'chatBubble__message--sent': type === 'sent',
				'chatBubble__message--received': type === 'received'
			}
		),
		
		'chatBubbleAuthor': classNames(
			'chatBubble__author',
			{
				'chatBubble__author--no-display': previousMessageSameSender
			}
		)
	};
	
	return (
		<div className={chatBubbleClassnames.chatBubble}>
			<img src={avatar} className={chatBubbleClassnames.chatBubbleAvatar} alt=""/>
			<div className={chatBubbleClassnames.chatBubbleContent}>
				<span className={chatBubbleClassnames.chatBubbleAuthor}
				      onClick={() => onGetUserInfo(message.author)}>{message.author}</span>
				<span className={chatBubbleClassnames.chatBubbleMessage}>{message.text}</span>
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
		timeAdded: PropTypes.number
	}),
	
	// Defines type of message.
	// Sent message is aligned to the right, otherwise to the left
	type: PropTypes.oneOf(['sent', 'received'])
};

export default chatBubble;