import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class SideBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: sessionStorage.getItem("username") !== null
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.switchFilterFormVisibility = this.switchFilterFormVisibility.bind(this);
		this.toTitleCase = this.toTitleCase.bind(this);
	}

	onInputChanged(event) {
		let form = this.state.post;
		form[event.target.name] = event.target.value;
	}

	switchFilterFormVisibility() {
		this.setState(prevState => {
			let newState = prevState;
			newState.isFilterByCountryVisible = !prevState.isFilterByCountryVisible;
			return newState;
		});
	}

	toTitleCase() {
		let discipline = this.props.discipline;
		let disciplineTokens = discipline.split('-');

		discipline = '';
		for (let disciplineToken of disciplineTokens) {
			discipline += disciplineToken.substr(0, 1).toUpperCase() + disciplineToken.substring(1) + " ";
		}

		return discipline.trim();
	}

	render() {
		let discipline = this.toTitleCase();

		return (
			<div className='col-12 col-md-4 col-lg-3 p-0 text-center bg-aviator'>
				<div id={`${this.props.discipline}-heading`} className='discipline-heading'>
					<NavLink to={`/air-sports/${this.props.discipline}`}>
						<div className='discipline-heading-title'>{discipline}</div>
					</NavLink>
				</div>
				{this.state.isLoggedIn &&
					<NavLink to={`/air-sports/${this.props.discipline}/about`}>
						<div className='air-sports-menu'>About</div>
					</NavLink>
				}
				{this.state.isLoggedIn &&
					<NavLink to={`/air-sports/${this.props.discipline}`}>
						<div className='air-sports-menu'>View Posts</div>
					</NavLink>
				}
				{this.state.isLoggedIn &&
					<NavLink to={`/air-sports/${this.props.discipline}/post`}>
						<div className='air-sports-menu'>Add New Post</div>
					</NavLink>
				}
				{/*{this.state.isLoggedIn &&*/}
					{/*<NavLink to={`/spots/${this.props.discipline}`}>*/}
						{/*<div className='air-sports-menu'>{`${discipline} Spots`}</div>*/}
					{/*</NavLink>*/}
				{/*}*/}
			</div>
		);
	}
}

export default SideBar;