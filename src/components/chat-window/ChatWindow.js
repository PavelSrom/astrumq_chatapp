import React from 'react';
import PropTypes from 'prop-types';
import './ChatWindow.css';

const chatWindow = props => (
	<div className="ChatWindow">
		{props.children}
	</div>
);

chatWindow.propTypes = {
	children: PropTypes.node
};

export default chatWindow;