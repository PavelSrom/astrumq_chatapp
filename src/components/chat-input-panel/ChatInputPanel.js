import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'reactstrap';
import './ChatInputPanel.css';

const chatInputPanel = props => (
	<div className="chatInputPanel">
		<Input
			className="chatInputPanel__textarea"
			type="textarea" placeholder="Vaše odpověď"
			onChange={props.messageChanged}
			value={props.message}
		/>
		<Button
			color="danger"
			className="chatInputPanel__button"
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
	messageChanged: PropTypes.func
};

export default chatInputPanel;