import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Alert} from 'reactstrap';
import {Redirect} from 'react-router';
import Form from '../../components/form/form';
import Input from '../../components/form/input/input';
import Checkbox from '../../components/form/checkbox/checkbox';
import Button from '../../components/form/button/button';
import {signIn} from '../../store/actions/authActions';

class Login extends Component {
	state = {
		emailInput: '',
		passwordInput: ''
	};
	
	inputChanged = event => {
		const inputName = event.target.name + 'Input';
		
		this.setState({ [inputName]: event.target.value });
	};

	onLogin = event => {
		event.preventDefault();

		const loginData = {
			email: this.state.emailInput,
			password: this.state.passwordInput
		};

		this.props.signIn(loginData);
	};
	
	render() {
		if (this.props.auth.uid) return <Redirect to="/chat"/>;
		return (
			<div className="login">
				<div className="container">
					<Form
						header={
							<React.Fragment>
								Pro vstup je potřeba se přihlásit nebo
								<Link className="form__headerText--a" to="/register"> registrovat</Link>
							</React.Fragment>
						}
						submitted={this.onLogin}
					>
						<Input onChange={this.inputChanged} name="email" value={this.state.emailInput} type="text" placeholder="E-mail"/>
						<Input onChange={this.inputChanged} name="password" value={this.state.passwordInput} type="password" placeholder="Password"/>
						{this.props.loginError &&
						<Alert color="danger">{this.props.loginError}</Alert>
						}
						<Checkbox description="Zapamatovat přihlášení"/>
						<Button className="form__button--to-black" color="danger">Přihlásit se</Button>
					</Form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loginError: state.auth.loginError,
	auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => {
	return {
		signIn: (credentials) => dispatch(signIn(credentials))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

