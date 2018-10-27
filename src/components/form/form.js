import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'reactstrap';

const form = props => {
	const avatar = '/images/avatar_big.png';

	return (
		<Col md={4} sm={8} xs={10} className="form">
			<div className="form__container">
				<div className="form__header">
					<img src={avatar} alt="" className="form__avatar"/>
					<p className="form__header-text">{props.header}</p>
				</div>
				<Form onSubmit={props.submitted} className="form__content">
					{props.children}
				</Form>
			</div>
		</Col>
	);
};

form.propTypes = {
	// Optional text that's under the avatar
	header: PropTypes.node,
	submitted: PropTypes.func,
	children: PropTypes.node,
};

export default form;