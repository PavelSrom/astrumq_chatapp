import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import PropTypes from 'prop-types';

const checkbox = props => (
	<FormGroup row check>
		<Label check>
			<Input type="checkbox"/>
			{props.description}
		</Label>
	</FormGroup>
);

checkbox.propTypes = {
	// Some text value next to checkbox
	description: PropTypes.string
};

export default checkbox;