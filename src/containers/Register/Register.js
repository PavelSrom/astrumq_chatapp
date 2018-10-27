import React, { Component } from 'react';
import { Alert, Container } from 'reactstrap';
import Form from '../../components/form/form';
import Input from '../../components/form/input/input';
import Button from '../../components/form/button/button';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { translateMessage } from '../../utils/translation';

class Register extends Component {
	state = {
		emailInput: '',
		passwordInput: '',
		passwordConfirmationInput: '',
	};
	
	inputChanged = event => {
		const inputName = event.target.name + 'Input';

		this.setState({ [inputName]: event.target.value });
	};

	passwordsMatch = () => {
		return this.state.passwordInput === this.state.passwordConfirmationInput;
	};
	
	onRegister = event => {
		event.preventDefault();
		const authData = {
			email: this.state.emailInput,
			password: this.state.passwordInput,
		};

		if (!this.passwordsMatch()) {
			this.props.throwRegistrationError('Hesla se neshodují.');
			return;
		}
		this.props.register(authData);
	};

	render() {
		const {
			registrationError,
		} = this.props;

		return (
			<div className="registration">
				<Container>
					<Form submitted={this.onRegister}>
						<Input
							onChange={this.inputChanged}
							type="text"
							name="email"
							placeholder="E-mail"
						/>
						<Input
							onChange={this.inputChanged}
							type="password"
							name="password"
							placeholder="Heslo"
						/>
						<Input
							onChange={this.inputChanged}
							type="password"
							name="passwordConfirmation"
							placeholder="Potvrzení hesla"
						/>
						{registrationError &&
						<Alert color="danger">{translateMessage(registrationError)}</Alert>
						}
						<Button className="form__button--to-black" color="danger">Zaregistrovat</Button>
					</Form>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	registrationError: state.auth.registrationError,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	register: (credentials) => dispatch(register(credentials, ownProps)),
	throwRegistrationError: errorMessage => dispatch({
		type: 'REGISTER_ERROR',
		payload: {
			err: {
				message: errorMessage,
			},
		},
	}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);