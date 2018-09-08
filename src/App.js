import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

import KinveyRequester from "./util/KinveyRequester";
import Observer from "./util/Observer";
import AppMessages from './util/AppMessages';

import Home from "./components/Home";
import Navigation from "./components/common/navigation/Navigation";
import Notification from "./components/common/Notification";
import Footer from './components/common/Footer';

import RegisterForm from "./components/user/RegisterForm";
import LoginForm from "./components/user/LoginForm";
import Logout from "./components/user/Logout";

import AirSportsNavigationPage from "./components/air-sports/AirSportsNavigationPage";
import AirSportMainPage from "./components/air-sports/AirSportMainPage";
import About from "./components/air-sports/About";
import PostForm from "./components/social/posts/PostForm";

import FlyingSpots from "./components/flying-spots/FlyingSpots";
import FlyingSpotsSelectForm from "./components/flying-spots/FlyingSpotsSelectForm";
import AddFlyingSpotForm from "./components/flying-spots/AddFlyingSpotForm";
import FlyingSpotDetails from "./components/flying-spots/FlyingSpotDetails";

import Market from "./components/market/Market";
import PublishForm from "./components/market/PublishForm";
import usersRouter from "./components/user/usersRouter";

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			isAdmin: false,
			user: null,
			successMessage: '',
			errorMessage: ''
		};

		this.processAuthResponse = this.processAuthResponse.bind(this);
		this.logout = this.logout.bind(this);

		Observer.subscribe(Observer.events.login, this.processAuthResponse);
		Observer.subscribe(Observer.events.logout, this.logout);
		Observer.subscribe(Observer.events.success, (message) => this.setState({successMessage: message}));
		Observer.subscribe(Observer.events.error, (message) => this.setState({errorMessage: message}));
	}

	componentDidMount() {
		let authToken = sessionStorage.getItem("authtoken");
		let username = sessionStorage.getItem("username");
		let userID = sessionStorage.getItem("userID");

		if (authToken && username && userID) {
			KinveyRequester.get('user', userID, 'kinvey')
				.then(user => {
					this.setState({
						isLoggedIn: true,
						isAdmin: !!user._kmd.roles,
						user: {
							username,
							authToken,
							userID
						}
					}).catch(console.log);
				});
		}
	}

	componentDidUpdate() {
		if (this.state.successMessage) {
			setTimeout(() => this.setState({successMessage: ''}), 3000);
		}

		if (this.state.errorMessage) {
			setTimeout(() => this.setState({errorMessage: ''}), 5000);
		}
	}

	processAuthResponse(response) {
		if (response.error) {
			this.setState({errorMessage: response.description});
			return;
		}

		sessionStorage.setItem("authtoken", response._kmd.authtoken);
		sessionStorage.setItem('username', response.username);
		sessionStorage.setItem("userID", response._id);

		let user = {
			userID: response._id,
			username: response.username,
			authToken: response._kmd.authtoken
		};

		this.setState({
			isAdmin: !!response._kmd.roles,
			isLoggedIn: true,
			user,
			successMessage: response.message
		});
	}

	logout() {
		this.setState({
			isLoggedIn: false,
			isAdmin: false,
			user: null,
			successMessage: AppMessages.LOGOUT_SUCCESSFUL
		});
	}

	render() {
		return (
			<div className="container">
				<Navigation isAdmin={this.state.isAdmin}/>
				{this.state.successMessage && <Notification message={this.state.successMessage} cssStyle="success"/>}
				{this.state.errorMessage && <Notification message={this.state.errorMessage} cssStyle="error"/>}

				<Route path='/' exact component={Home}/>

				<Route path='/users' component={usersRouter}/>

				<Route path='/air-sports' exact component={AirSportsNavigationPage}/>
				<Route path='/air-sports/gliding' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='gliding'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='gliding'/>}/>
				<Route path='/air-sports/hang-gliding' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='hang-gliding'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='hang-gliding'/>}/>
				<Route path='/air-sports/paragliding' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='paragliding'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='paragliding'/>}/>
				<Route path='/air-sports/speed-flying' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='speed-flying'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='speed-flying'/>}/>
				<Route path='/air-sports/sky-diving' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='sky-diving'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='sky-diving'/>}/>
				<Route path='/air-sports/wingsuit-flying' exact render={() => this.state.isLoggedIn
					? <AirSportMainPage
						discipline='wingsuit-flying'
						isLoggedIn={this.state.isLoggedIn}
						isAdmin={this.state.isAdmin}/>
					: <About discipline='wingsuit-flying'/>}/>

				<Route path='/air-sports/:discipline/post' exact render={({match}) => <PostForm match={match}/>}/>
				<Route path='/air-sports/:discipline/posts/:id/edit' exact
					   render={({match}) => <PostForm match={match}/>}/>
				<Route path='/air-sports/:discipline/about' exact render={({match}) =>
					<About discipline={match.params.discipline} match={match}/>}/>

				<Route path='/flying-spots' exact component={FlyingSpots}/>
				<Route path='/flying-spots/find' exact component={FlyingSpotsSelectForm}/>
				<Route path='/flying-spots/add' exact component={AddFlyingSpotForm}/>
				<Route path='/flying-spots/:id/details' exact render={({match}) =>
					<FlyingSpotDetails id={match.params.id}/>}/>
				<Route path='/market' exact component={Market}/>
				<Route path='/market/publish' component={PublishForm}/>

				<Footer/>
			</div>
		);
	}
}

export default App;
