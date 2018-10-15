import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';
import logo from '../../images/logo_astrumq.png';
import avatar from '../../images/avatar.png';
import logout from '../../images/logout.png';
import './ChatHeader.css';

class ChatHeader extends Component {
	state = {
		isOpen: false
	};
	
	toggleNavbar = () => {
		this.setState(prevState => ({isOpen: !prevState.isOpen}))
	};
	
	render() {
		return (
			<Navbar
				color="light"
				light
				expand="md"
				className="chatHeader"
			>
				<NavbarBrand href="/chat">
					<img src={logo} alt=""/>
				</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar}/>
				<Collapse navbar isOpen={this.state.isOpen}>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<img src={avatar} className="chatHeader__userAvatar" alt=""/>
							<span className="chatHeader__userEmail">{this.props.userEmail}</span>
							<img className="chatHeader__logoutIcon" src={logout} onClick={this.props.onSignOut}/>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}

ChatHeader.propTypes = {
	// User email that is taken from the currently logged user
	userEmail: PropTypes.string,
	
	// Event which will sign the user out and redirect the web app on the login screen
	onSignOut: PropTypes.func
};

export default ChatHeader;