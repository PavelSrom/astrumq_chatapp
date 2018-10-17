import React, {Component} from 'react';
import Loader from 'react-loader';
import uuid from 'uuid/v4';
import NotificationSystem from 'react-notification-system';
import {Container} from 'reactstrap';
import firebase from '../../fire';
import ChatHeader from '../../components/chat-header/ChatHeader';
import ChatWindow from '../../components/chat-window/ChatWindow';
import ChatInputPanel from '../../components/chat-input-panel/ChatInputPanel';
import ChatBubble from '../../components/chat-bubble/ChatBubble';
import UserDetailModal from '../../components/user-detail-modal/UserDetailModal';

class Chat extends Component {

	state = {
		loggedUser: null,
		messageInput: '',
		messages: [],
		loadingMessages: true,
		openedUserDetails: false,
		clickedUser: null,
		messagesPerPage: 10,
		totalNumberOfMessages: 0
	};

	componentDidMount() {
		this.notificationSystem = null;
		this.checkForLoggedUser();
	}

	checkForLoggedUser() {
		// Set logged user to state and register event handler for new messages
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				this.setState({loggedUser: currentUser.email});
				this.fetchMessages();
			}
		});
	}

	/*
		* 7. Oct. 2018 6:40 PM - Changed logic of fetching initial messages.
		
		* - Use of .on('child_added') is inefficient, because if there is initially 10000 messages in the database
		* then this event is called 10000x and it can lead to performance issues later.
		
		* Better solution is to fetch all messages by using .once('value'), remove last element
		* and then register .on('child_added') limited to last element.
	 */

	fetchMessages() {
		const messagesRef = firebase.database().ref('messages');
		// Fetch initial messages
		messagesRef.once('value').then(snapshot => {
			const messages = Object.values(snapshot.val());
			const messagesWithoutLastOne = messages.slice(0, messages.length - 1);

			// Set initial messages
			this.setState({messages: messagesWithoutLastOne}, () => {
				this.registerOnMessageAddedHandler();
				this.toggleLoadingMessages();
			});
		})
	}

	registerOnMessageAddedHandler() {
		const messagesRef = firebase.database().ref('messages');

		// Listen to new messages
		messagesRef.limitToLast(1).on('child_added', snapshot => {
			this.onMessageAdded(snapshot.val());
		})
	}

	onMessageAdded(message) {
		// Concat new messages with the old ones
		const oldMessages = [...this.state.messages];
		this.setState({
			messages: oldMessages.concat([message]),
		});
	}

	sendMessage = event => {
		event.preventDefault();

		const dataToSend = {
			author: this.state.loggedUser,
			text: this.state.messageInput,
			timeAdded: new Date().getTime()
		};

		const messagesRef = firebase.database().ref('message');

		// Send message to firebase database, clear the input and update user's counter to +1
		messagesRef.push(dataToSend)
			.then(() => {
				this.updateUsersMessageCounter();
				this.setState({messageInput: ''});

				// Send simple notification
				this.notificationSystem.addNotification({
					message: 'Zpráva byla úspěšně odeslána',
					level: 'success',
					position: 'br'
				})
			})
	};

	updateUsersMessageCounter() {
		firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value').then(snapshot => {
			const currentUser = snapshot.val();
			const messagesNumber = currentUser.messages;

			firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
				messages: messagesNumber + 1
			})
		});
	}

	messageChanged = event => {
		this.setState({messageInput: event.target.value});
	};

	onSignOut = () => {
		firebase.auth().signOut()
			.then(() => {
				this.notificationSystem.addNotification({
					message: 'Byli jste úspěšně odhlášeni',
					level: 'info'
				});
				this.props.history.push('/')
			})
			.catch(error => {
				alert(error.message);
			})
	};

	getUserInfo = email => {
		// Get user information from firebase database by its email
		firebase.database().ref('users')
			.orderByChild('email')
			.equalTo(email)
			.once('value').then(data => {
			// Returned JSON contains unique ID as key by default, so we have to extract information with Object.values
			// Not an ideal solutions
			const user = Object.values(data.val())[0];

			this.setState({clickedUser: user, openedUserDetails: true});

			// Scroll to top
			window.scrollTo(0, 0);
		});
	};

	onUserDetailsClosed = () => {
		this.setState({openedUserDetails: false});
	};

	checkIfPreviousMessageHasSameSender(indexOfMessage) {
		if (indexOfMessage > 0) {
			const thisMessage = this.state.messages[indexOfMessage];
			const previousMessage = this.state.messages[indexOfMessage - 1];

			return thisMessage.author === previousMessage.author;
		}

		return false;
	}

	toggleLoadingMessages = () => {
		this.setState({loadingMessages: false});
	};

	render() {
		let messages = this.state.messages.map((message, index) => {
			const typeOfMessage = message.author === this.state.loggedUser ? 'sent' : 'received';
			const doesPreviousMessageHaveSameSender = this.checkIfPreviousMessageHasSameSender(index);

			return (
				<ChatBubble
					key={uuid()}
					message={message}
					type={typeOfMessage}
					onGetUserInfo={this.getUserInfo}
					previousMessageSameSender={doesPreviousMessageHaveSameSender}
				/>
			)
		});

		return (
			<div className="chat">
				<NotificationSystem ref={el => this.notificationSystem = el}/>
				<ChatHeader
					userEmail={this.state.loggedUser}
					onSignOut={this.onSignOut}
				/>
				<Loader
					loaded={!this.state.loadingMessages}
					options={{position: 'relative', top: '0'}}
				>
					<Container fluid>
						<ChatWindow>
							{messages}
							<ChatInputPanel
								messageChanged={this.messageChanged}
								sendMessage={this.sendMessage}
								message={this.state.messageInput}
							/>
						</ChatWindow>
					</Container>
				</Loader>
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