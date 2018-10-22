import React, {Component} from 'react';
import Loader from 'react-loader';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import firebase from '../../fire';
import ChatWindow from '../../components/chat-window/ChatWindow';
import ChatInputPanel from '../../components/chat-input-panel/ChatInputPanel';
import ChatBubble from '../../components/chat-bubble/ChatBubble';
import UserDetailModal from '../../components/user-detail-modal/UserDetailModal';
import {loadInitialMessages, sendMessage} from '../../store/actions/chatActions';
import {signOut} from '../../store/actions/authActions';

class Chat extends Component {

	state = {
		messageInput: '',
		openedUserDetails: false,
		clickedUser: null,
	};

	componentDidMount() {
		this.props.loadInitialMessages();
	}

	sendMessage = () => {

		const dataToSend = {
			author: this.props.auth.email,
			text: this.state.messageInput,
			timeAdded: new Date().getTime()
		};

		this.props.sendMessage(dataToSend);
		this.setState({messageInput: ''})
	};

	detectEnterPress = (event) => {
		if (event.key === 'Enter') this.sendMessage();
	};

	messageChanged = event => {
		this.setState({messageInput: event.target.value});
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
			const thisMessage = this.props.chat.messages[indexOfMessage];
			const previousMessage = this.props.chat.messages[indexOfMessage - 1];

			return thisMessage.author === previousMessage.author;
		}

		return false;
	}

	render() {
		let messages = this.props.chat.messages.map((message, index) => {
			const typeOfMessage = message.author === this.props.auth.email ? 'sent' : 'received';
			const doesPreviousMessageHaveSameSender = this.checkIfPreviousMessageHasSameSender(index);

			return (
				<ChatBubble
					key={message.timeAdded}
					message={message}
					type={typeOfMessage}
					onGetUserInfo={this.getUserInfo}
					previousMessageSameSender={doesPreviousMessageHaveSameSender}
				/>
			)
		});

		return (
			<div className="chat">
				<Loader
					loaded={!this.props.chat.chatIsLoading}
					options={{position: 'relative'}}
				>
					<Container fluid>
						<ChatWindow>
							{messages}
							<ChatInputPanel
								messageChanged={this.messageChanged}
								onKeyPress={this.detectEnterPress}
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

const mapStateToProps = state => {
	return {
		chat: state.chat,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

const mapDispatchToProps = dispatch => ({
	sendMessage: message => dispatch(sendMessage(message)),
	loadInitialMessages: () => dispatch(loadInitialMessages()),
	signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);