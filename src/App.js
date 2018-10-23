import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import Notifications from 'react-notification-system-redux';
import Login from './containers/Login/Login';
import './App.sass';
import Register from './containers/Register/Register';
import Chat from './containers/Chat/Chat';
import PrivateRoute from './hoc/PrivateRoute';
import Header from './components/header/header';
import RedirectIfLoggedInRoute from './hoc/RedirectIfLoggedInRoute';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header/>
					<Container fluid>
						<Switch>
							<RedirectIfLoggedInRoute path="/" exact component={Login}/>
							<RedirectIfLoggedInRoute path="/register" exact component={Register}/>
							<PrivateRoute path="/chat/:page(\d+)?" exact component={Chat}/>
						</Switch>
						<Notifications notifications={this.props.notifications}/>
					</Container>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => ({
	notifications: state.notifications
});

export default connect(mapStateToProps)(App);
