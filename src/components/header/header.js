import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { signOut } from '../../store/actions/authActions';
import { withRouter } from 'react-router';

const header = props => {
	const logo = '/images/logo_astrumq.png';
	const avatar = '/images/avatar.png';
	const logout = '/images/logout.png';

	const {
		uid,
		email,
	} = props.auth;

	let headerContent = null;

	if (props.auth.uid) {
		headerContent = (
			<React.Fragment>
				<div>
					<img src={logo} alt=""/>
				</div>
				<div>
					<img src={avatar} alt=""/>
					<span>{email}</span>
					<img className="chatHeader__logoutIcon" src={logout} onClick={props.signOut}/>
				</div>
			</React.Fragment>
		)
	} else {
		headerContent = (<img src={logo} alt=""/>);
	}

	return (
		<header className={
			classNames({
				'header': true,
				'header--default': !uid,
				'header--chat': uid,
			})}>
			{headerContent}
		</header>
	)
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	signOut: () => dispatch(signOut(ownProps)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header));