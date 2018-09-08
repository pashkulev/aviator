import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Observer from '../../../util/Observer';
import LoggedInSection from "./LoggedInSection";
import AnonymousSection from "./AnonymousSection";
import Menu from "./Menu";

class Navigation extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: sessionStorage.getItem("username")
		};

		Observer.subscribe(Observer.events.login, (response) =>
			this.setState({
				username: response.username,

			}));
		Observer.subscribe(Observer.events.logout, () => this.setState({username: ''}));
	}

	render() {
		return (
			<div className='row header'>
				<nav className="navbar navbar-expand-md navbar-dark navigation">
					<Link className="navbar-brand" to="/">Aviators Network</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
						<span className="navbar-toggler-icon">

						</span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<Menu/>
						{this.state.username
							? <LoggedInSection username={this.state.username} isAdmin={this.props.isAdmin}/>
							: <AnonymousSection/>
						}
					</div>
				</nav>
			</div>
		);
	}
}

export default Navigation;