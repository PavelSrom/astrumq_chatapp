import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../fire';
import Header from '../../components/default-header/DefaultHeader';
import Form from '../../components/form/Form';
import Input from '../../components/form/input/Input';
import Checkbox from '../../components/form/checkbox/Checkbox';
import Button from '../../components/form/button/Button';

class Login extends Component {
	state = {
		emailInput: '',
		passwordInput: ''
	};
	
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.history.push('/chat');
			}
		})
	}
	
	inputChanged = event => {
		const inputName = event.target.name + 'Input';
		
		this.setState({ [inputName]: event.target.value });
	};
	
	checkForBlankInputs = () => {
		let isValid = true;
		
		if (!this.state.emailInput) {
			alert("Zadejte email");
			isValid = false;
		} else if (!this.state.passwordInput) {
			alert("Zadejte heslo");
			isValid = false;
		}
		
		return isValid;
	};
	
	onLogin = event => {
		event.preventDefault();
		if (this.checkForBlankInputs()){
			firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput)
				.catch(error => alert(error.message));
		}
	};
	
	render() {
		return (
			<div className="Login">
				<Header/>
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
						<Checkbox description="Zapamatovat přihlášení"/>
						<Button color="danger">Přihlásit se</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default Login;

