import React, {Component} from 'react';
import {Container} from 'reactstrap';
import firebase from '../../fire';
import DefaultHeader from '../../components/default-header/DefaultHeader';
import Form from '../../components/form/Form';
import Input from '../../components/form/input/Input';
import Button from '../../components/form/button/Button';

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
	
	checkForBlank = () => {
		let isValid = true;
		
		if (!this.state.emailInput) {
			alert('Zadejte email');
			isValid = false;
		}
		else if (!this.state.passwordInput) {
			alert('Zadejte heslo');
			isValid = false;
		}
		else if (!this.state.passwordConfirmationInput) {
			alert('Zadejte oveřovací heslo');
			isValid = false;
		}
		
		return isValid;
	};
	
	passwordsMatch = () => {
		if (this.state.passwordInput !== this.state.passwordConfirmationInput) {
			alert('Ověřovací heslo není stejné');
			return false;
		}
		
		return true;
	};
	
	onRegister = event => {
		if (this.checkForBlank() && this.passwordsMatch()) {
			const authData = {
				email: this.state.emailInput,
				password: this.state.passwordInput,
			};
			
			firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
				.then(() => {
					const currentUser = firebase.auth().currentUser;
					
					firebase.database().ref('users').child(currentUser.uid).set({
						registrationTime: new Date().getTime(),
						messages: 0,
						email: authData.email
					})
				})
				.catch(error => {
					alert(error.message);
				})
		}
		
		event.preventDefault();
	};
	
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.history.push('/chat');
			}
		})
	}
	
	render() {
		return (
			<div className="registration">
				<DefaultHeader/>
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
						<Button color="danger">Zaregistrovat</Button>
					</Form>
				</Container>
			</div>
		)
	}
}

export default Register;