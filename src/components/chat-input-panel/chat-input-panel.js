import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';

const chatInputPanel = props => (
	<div className="chat-input-panel">
		<Input
			className="chat-input-panel__textarea"
			type="textarea" placeholder="Vaše odpověď"
			onChange={props.messageChanged}
			value={props.message}
			onKeyPress={props.onKeyPress}
		/>
		<Button
			color="danger"
			className="chat-input-panel__button"
			onClick={props.sendMessage}
		>
			Odeslat
		</Button>
	</div>
);

chatInputPanel.propTypes = {
	// Message is the currently inputted value
	message: PropTypes.string,
	
	// Event which will send date to the firebase database
	sendMessage: PropTypes.func,
	
	// Handler that changes current input value
	messageChanged: PropTypes.func,
};

export default chatInputPanel;