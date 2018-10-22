import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import logo from '../../images/logo_astrumq.png';
import avatar from '../../images/avatar.png';
import logout from '../../images/logout.png';
import {signOut} from '../../store/actions/authActions';
import {withRouter} from 'react-router';

const header = props => {
	const headerClassNames = classNames(
		'header',
		{
			'header--default': !props.auth.uid,
			'header--chat': props.auth.uid
		}
	);

	let headerContent = null;

	if (props.auth.uid) {
		headerContent = (
			<React.Fragment>
				<div>
					<img src={logo} alt=""/>
				</div>
				<div>
					<img src={avatar} alt=""/>
					<span>{props.auth.email}</span>
					<img className="chatHeader__logoutIcon" src={logout} onClick={props.signOut}/>
				</div>
			</React.Fragment>
		)
	} else {
		headerContent = (<img src={logo} alt=""/>);
	}

	return (
		<header className={headerClassNames}>
			{headerContent}
		</header>
	)
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	signOut: () => dispatch(signOut(ownProps))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header));