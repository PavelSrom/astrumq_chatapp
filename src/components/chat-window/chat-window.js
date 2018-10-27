import React from 'react';
import PropTypes from 'prop-types';

const chatWindow = props => (
	<div className="chat-window">
		{props.children}
	</div>
);

chatWindow.propTypes = {
	children: PropTypes.node,
};

export default chatWindow;