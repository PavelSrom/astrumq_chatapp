import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../fire';
import Header from '../../components/DefaultHeader/DefaultHeader';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';
import Checkbox from '../../components/Form/Checkbox/Checkbox';
import Button from '../../components/Form/Button/Button';

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
			const authData = {
				email: this.state.emailInput,
				password: this.state.passwordInput
			}
			
			firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
				.catch(error => alert(error.message));
		}
	};
	
	render() {
		return (
			<div className="Login">
				<Header/>
				<div className="container">
					<Form
						header={<React.Fragment>Pro vstup je potřeba se přihlásit nebo <Link to="/register">registrovat</Link></React.Fragment>}
						submitted={this.onLogin}
					>
						<Input onChange={this.inputChanged} name="email" value={this.state.emailInput} type="text" placeholder="E-mail"/>
						<Input onChange={this.inputChanged} name="password" value={this.state.passwordInput} type="password" placeholder="Password"/>
						<Checkbox description="Zapamatovat přihlášení"/>
						<Button className="button">Přihlásit se</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default Login;

