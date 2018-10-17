import React from 'react';
import PropTypes from 'prop-types';

const chatWindow = props => (
	<div className="chatWindow">
		{props.children}
	</div>
);

chatWindow.propTypes = {
	children: PropTypes.node
};

export default chatWindow;