import React, { Component } from 'react';
import Loader from 'react-loader';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import firebase from '../../fire';
import ChatWindow from '../../components/chat-window/chat-window';
import ChatInputPanel from '../../components/chat-input-panel/chat-input-panel';
import ChatBubble from '../../components/chat-bubble/chat-bubble';
import UserDetailModal from '../../components/user-detail-modal/user-detail-modal';
import { loadInitialMessages, sendMessage } from '../../store/actions/chatActions';
import { signOut } from '../../store/actions/authActions';
import 'rc-pagination/dist/rc-pagination.min.css';

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
			timeAdded: new Date().getTime(),
		};

		this.props.sendMessage(dataToSend);
		this.setState({ messageInput: '' })
	};

	detectEnterPress = (event) => {
		if (event.key === 'Enter') this.sendMessage();
	};

	messageChanged = event => {
		this.setState({ messageInput: event.target.value });
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

			this.setState({ clickedUser: user, openedUserDetails: true });

			// Scroll to top
			window.scrollTo(0, 0);
		});
	};

	onUserDetailsClosed = () => {
		this.setState({ openedUserDetails: false });
	};

	checkIfPreviousMessageHasSameSender(messageTime, indexInCurrentPage) {
		const {
			chat: { messages },
		} = this.props;

		// First message each page should be always rendered with avatar
		if (indexInCurrentPage === 0) return false;

		const matchingMessage = messages.find(message => message.timeAdded === messageTime);
		const indexOfMessage = messages.indexOf(matchingMessage);

		if (indexOfMessage > 0) {
			const thisMessage = messages[indexOfMessage];
			const previousMessage = messages[indexOfMessage - 1];
			return thisMessage.author === previousMessage.author;
		}

		return false;
	}

	onPageChanged = current => {
		this.props.history.push(`/chat/${current}`);
	};

	render() {
		const {
			chat: { messages },
			messagesPerPage,
			auth,
		} = this.props;

		const {
			page,
		} = this.props.match.params;

		// All params are accepted as string, so we need to parse it to int
		const currentPage = page ? parseInt(page) : 1;
		const numberOfMessages = messages.length;
		const pageSize = messagesPerPage;

		let messagesToShow = messages;
		// If page is specified in params, then slice messages to required range
		if (currentPage) {
			// Index of starting message
			const startFrom = (currentPage - 1) * pageSize;
			// Index of ending message
			const endAt = (currentPage - 1) * pageSize + pageSize;

			messagesToShow = messagesToShow.slice(startFrom, endAt);
		}

		const messagesToRender = messagesToShow.map((message, indexInCurrentPage) => {
			const typeOfMessage = message.author === auth.email ? 'sent' : 'received';
			const doesPreviousMessageHaveSameSender = this.checkIfPreviousMessageHasSameSender(message.timeAdded, indexInCurrentPage);

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
					options={{ position: 'relative' }}
				>
					<Container fluid>
						<ChatWindow>
							{messagesToRender}
							<Pagination
								total={numberOfMessages}
								pageSize={pageSize}
								onChange={this.onPageChanged}
								current={currentPage}
							/>
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
		profile: state.firebase.profile,
		messagesPerPage: state.chat.messagesPerPage,
	};
};

const mapDispatchToProps = dispatch => ({
	sendMessage: message => dispatch(sendMessage(message)),
	loadInitialMessages: () => dispatch(loadInitialMessages()),
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);