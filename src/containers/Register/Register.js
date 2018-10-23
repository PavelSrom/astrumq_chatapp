import React, {Component} from 'react';
import {Alert, Container} from 'reactstrap';
import Form from '../../components/form/form';
import Input from '../../components/form/input/input';
import Button from '../../components/form/button/button';
import {connect} from 'react-redux';
import {register} from '../../store/actions/authActions';

class Register extends Component {
	state = {
		emailInput: '',
		passwordInput: '',
		passwordConfirmationInput: ''
	};
	
	inputChanged = event => {
		const inputName = event.target.name + 'Input';
		
		this.setState({[inputName]: event.target.value});
	};

	// TODO: Form validation
	
	onRegister = event => {
		event.preventDefault();
		const authData = {
			email: this.state.emailInput,
			password: this.state.passwordInput,
		};
		this.props.register(authData);
	};

	render() {
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
						{this.props.registrationError &&
						<Alert color="danger">{this.props.registrationError}</Alert>
						}
						<Button className="form__button--to-black" color="danger">Zaregistrovat</Button>
					</Form>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	registrationError: state.auth.registrationError
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	register: (credentials) => dispatch(register(credentials, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);