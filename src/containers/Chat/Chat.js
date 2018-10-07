import React, {Component} from 'react';
import Loader from 'react-loader';
import uuid from 'uuid/v4';
import firebase from '../../fire';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import ChatInputPanel from "../../components/ChatInputPanel/ChatInputPanel";
import ChatBubble from '../../components/ChatBubble/ChatBubble';

import './Chat.css';

class Chat extends Component {
	
	state = {
		loggedUser: null,
		messageInput: '',
		messages: [],
		loadingMessages: true,
	}
	
	componentDidMount() {
		this.checkForLoggedUser();
	}
	
	checkForLoggedUser() {
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				this.setState({loggedUser: currentUser.email})
				this.registerOnMessageAddedHandler();
			}
		});
	}
	
	registerOnMessageAddedHandler() {
		const firebaseRef = firebase.database().ref('messages');
		
		firebaseRef.on('child_added', snapshot => {
			this.onMessageAdded(snapshot.val());
		})
	}
	
	onMessageAdded(message) {
		const oldMessages = [...this.state.messages];
		this.setState({
			messages: oldMessages.concat([message]),
			loadingMessages: false
		});
	}
	
	sendMessage = event => {
		event.preventDefault();
		
		const dataToSend = {
			author: this.state.loggedUser,
			text: this.state.messageInput,
			timeAdded: new Date().getTime()
		};
		
		firebase.database().ref('messages').push(dataToSend)
			.then(() => {
				this.updateUsersMessageCounter();
				this.setState({messageInput: ''});
			});
	}
	
	updateUsersMessageCounter() {
		firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value', snapshot => {
			const currentUser = snapshot.val();
			const messagesNumber = currentUser.messages;
			
			firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
				messages: messagesNumber + 1
			})
		});
	}
	
	messageChanged = event => {
		this.setState({messageInput: event.target.value});
	}
	
	onSignOut = () => {
		firebase.auth().signOut()
			.then(() => {
				alert("You have been logged out successfully");
				this.props.history.push('/')
			})
			.catch(error => {
				alert(error.message);
			})
	}
	
	getUserInfo = email => {
		firebase.database().ref('users')
			.orderByChild('email')
			.equalTo(email)
			.once('value').then(data => {
				const user = Object.values(data.val())[0];
				alert(`Email: ${user.email}\nDatum registrace: ${new Date(user.registrationTime).toLocaleDateString('cs-ez')}\nPocet zprav: ${user.messages}`)
			});
	}
	
	render() {
		let messages = this.state.messages.map(message => {
			const typeOfMessage = message.author === this.state.loggedUser ? 'sent' : 'received';
			return (
				<ChatBubble key={uuid()} message={message} type={typeOfMessage} onGetUserInfo={this.getUserInfo}/>
			)
		});
		
		return (
			<div className="Chat">
				<ChatHeader userEmail={this.state.loggedUser} onSignOut={this.onSignOut}/>
				<div className="container">
					<ChatWindow>
						<div id="chat">
							<div>
								<Loader loaded={!this.state.loadingMessages} options={{position: 'relative', top: '0'}}>
									{messages}
								</Loader>
							</div>
						</div>
						<ChatInputPanel messageChanged={this.messageChanged} sendMessage={this.sendMessage}
						                message={this.state.messageInput}/>
					</ChatWindow>
				</div>
			</div>
		)
	}
}

export default Chat;