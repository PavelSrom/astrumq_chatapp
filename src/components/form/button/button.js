import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const button = props => (
	<FormGroup row>
		<Button {...props}>
			{props.children}
		</Button>
	</FormGroup>
);

button.propTypes = {
	children: PropTypes.node,
};

export default button;