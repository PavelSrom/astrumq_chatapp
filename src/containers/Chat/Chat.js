import React, {Component} from 'react';
import Loader from 'react-loader';
import uuid from 'uuid/v4';
import firebase from '../../fire';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import ChatInputPanel from "../../components/ChatInputPanel/ChatInputPanel";
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import './Chat.css';
import UserDetailModal from "../../components/UserDetailModal/UserDetailModal";

class Chat extends Component {
	
	state = {
		loggedUser: null,
		messageInput: '',
		messages: [],
		loadingMessages: true,
		openedUserDetails: false,
		clickedUser: null
	}
	
	componentDidMount() {
		this.checkForLoggedUser();
	}
	
	checkForLoggedUser() {
		// Set logged user to state and register event handler for new messages
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				this.setState({loggedUser: currentUser.email})
				this.fetchAllMessages();
			}
		});
	}
	
	/*
		* 7. Oct. 2018 6:40 PM - Changed logic of fetching initial messages.
		*
		* - Use of .on('child_added') is inefficient, because if there is initially 10000 messages in the database
		* then this event is called 10000x and it can lead to performance issues later.
		*
		* Better solution is to fetch all messages by using .once('value'), remove last element
		* and then register .on('child_added') limited to last element.
	 */
	
	fetchAllMessages() {
		const firebaseRef = firebase.database().ref('messages');
		
		// Fetch initial messages
		firebaseRef.once('value', snapshot => {
			const messages = Object.values(snapshot.val());
			const messagesWithoutLastOne = messages.slice(0, messages.length - 1);
			
			// Set initial messages
			this.setState({ messages: messagesWithoutLastOne }, () => {
				this.registerOnMessageAddedHandler()
			});
		})
	}
	
	registerOnMessageAddedHandler() {
		const firebaseRef = firebase.database().ref('messages');
		
		// Listen to new messages
		firebaseRef.limitToLast(1).on('child_added', snapshot => {
			this.onMessageAdded(snapshot.val());
		})
	}
	
	onMessageAdded(message) {
		// Concat new messages with the old ones
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
		
		// Send message to firebase database, clear the input and update user's counter to +1
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
		// Get user information from firebase database by its email
		firebase.database().ref('users')
			.orderByChild('email')
			.equalTo(email)
			.once('value').then(data => {
				// Returned JSON contains unique ID as key by default, so we have to extract information with Object.values
				// Not an ideal solutions
				const user = Object.values(data.val())[0];
				
				this.setState({ clickedUser: user, openedUserDetails: true });
				
				// Scroll to top
				window.scrollTo(0, 0);
			});
	}
	
	onUserDetailsClosed = () => {
		this.setState({ openedUserDetails: false });
	}
	
	checkIfPreviousMessageHasSameSender(indexOfMessage) {
		if(indexOfMessage > 0){
			const thisMessage = this.state.messages[indexOfMessage];
			const previousMessage = this.state.messages[indexOfMessage - 1];
			
			return thisMessage.author === previousMessage.author;
		}
		
		return false;
	}
	
	render() {
		let messages = this.state.messages.map((message, index) => {
			const typeOfMessage = message.author === this.state.loggedUser ? 'sent' : 'received';
			const doesPreviousMessageHaveSameSender = this.checkIfPreviousMessageHasSameSender(index);
			
			return (
				<ChatBubble key={uuid()} message={message} type={typeOfMessage} onGetUserInfo={this.getUserInfo} previousMessageSameSender={doesPreviousMessageHaveSameSender}/>
			)
		});
		
		return (
			<div className="Chat">
				<ChatHeader
					userEmail={this.state.loggedUser}
					onSignOut={this.onSignOut}
				/>
				<div className="container">
					<ChatWindow>
						<div id="chat">
							<div>
								<Loader
									loaded={!this.state.loadingMessages}
									options={{position: 'relative', top: '0'}}
								>
									{messages}
								</Loader>
							</div>
						</div>
						<ChatInputPanel
							messageChanged={this.messageChanged}
							sendMessage={this.sendMessage}
							message={this.state.messageInput}
						/>
					</ChatWindow>
				</div>
				{this.state.openedUserDetails &&
					<UserDetailModal
						user={this.state.clickedUser}
						onUserDetailsClosed={this.onUserDetailsClosed}
					/>
				}
			</div>
		)
	}
}

export default Chat;