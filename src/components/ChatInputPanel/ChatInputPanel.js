import React from 'react';
import PropTypes from 'prop-types';
import './ChatInputPanel.css';

const chatInputPanel = props => (
	<div className="ChatInputPanel row">
		<div className="col-md-3 left">
		
		</div>
		<div className="col-md-9 left">
			<textarea placeholder="Vaše odpověď" onChange={props.messageChanged} value={props.message} />
			<input type="submit" value="Odeslat" onClick={props.sendMessage} />
		</div>
		<div className="col-md-3 left">
		
		</div>
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