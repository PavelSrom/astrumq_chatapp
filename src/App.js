import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Loader from 'react-loader';
import firebase from './fire';
import './App.css';
import Register from "./containers/Register/Register";
import Chat from "./containers/Chat/Chat";
import PrivateRoute from "./hoc/PrivateRoute";

class App extends Component {
	state = {
		authUser: null,
		isUserAuthenticated: false,
		loading: true
	};
	
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user){
				this.setState({ authUser: user, isUserAuthenticated: true, loading: false});
			} else {
				this.setState({ authUser: null, isUserAuthenticated: false, loading: false});
			}
		})
	}
	
  render() {
	 
    return (
      <div className="App">
	      <Loader loaded={!this.state.loading} color="#FF0000">
		      <Switch>
			      <Route path="/" exact component={Login}/>
			      <Route path="/register" exact component={Register}/>
			      <PrivateRoute path="/chat" exact component={Chat} isUserAuthenticated={this.state.isUserAuthenticated} />
		      </Switch>
	      </Loader>
      </div>
    );
  }
}

export default App;
