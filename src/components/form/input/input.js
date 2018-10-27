import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const input = props => (
	<FormGroup row>
		<Input {...props} className="form__input"/>
	</FormGroup>
);

export default input;