import React from 'react';
import {withRouter} from 'react-router-dom';

import FormTitle from "../common/form-elements/common/FormTitle";
import TextInputComponent from "../common/form-elements/input/TextInputComponent";
import SubmitButton from "../common/form-elements/common/SubmitButton";
import AppConstants from "../../util/AppConstants";
import Observer from "../../util/Observer";
import SelectComponent from "../common/form-elements/select/SelectComponent";
import Countries from '../../data/countries';
import KinveyRequester from "../../util/KinveyRequester";
import AppMessages from '../../util/AppMessages';
import PasswordInputComponent from "../common/form-elements/input/PasswordInputComponent";

class RegisterForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: '',
				email: '',
				country: '',
				password: '',
				confirm: ''
			}
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChanged(event) {
		let user = this.state.user;
		user[event.target.name] = event.target.value.trim();
		this.setState({user});
	}

	onSubmit() {
		if (!this.state.user.username) {
			Observer.trigger(Observer.events.error, AppMessages.USERNAME_REQUIRED);
			return;
		}

		if (AppConstants.EMPTY_SPACE_REGEX.test(this.state.user.username)) {
			Observer.trigger(Observer.events.error, AppMessages.EMPTY_SPACES_NOT_ALLOWED);
			return;
		}

		if (this.state.user.username.length < 3 || this.state.user.username.length > 20) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_USERNAME);
			return;
		}

		if (!this.state.user.email) {
			Observer.trigger(Observer.events.error, AppMessages.EMAIL_REQUIRED);
			return;
		}

		if (!AppConstants.EMAIL_REGEX.test(this.state.user.email)) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_EMAIL);
			return;
		}

		if (!this.state.user.password) {
			Observer.trigger(Observer.events.error, AppMessages.PASSWORD_REQUIRED);
			return;
		}

		if (this.state.user.password.length < 8 || this.state.user.password.length > 20) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_PASSWORD);
			return;
		}

		if (!this.state.user.confirm) {
			Observer.trigger(Observer.events.error, AppMessages.CONFIRM_PASSWORD_REQUIRED);
			return;
		}

		if (this.state.user.confirm.length < 8 || this.state.user.confirm.length > 20) {
			Observer.trigger(Observer.events.error,AppMessages.INVALID_CONFIRM_PASSWORD);
			return;
		}

		if (this.state.user.password !== this.state.user.confirm) {
			Observer.trigger(Observer.events.error, AppMessages.PASSWORDS_MISMATCH);
			return;
		}

		let user = Object.assign({}, this.state.user);
		delete user.confirm;
		if (user.country.startsWith("---")) {
			user.country = "";
		}

		KinveyRequester.post('user', '', 'basic', user)
			.then(response => {
				response.message = AppMessages.REGISTRATION_SUCCESSFUL;
				Observer.trigger(Observer.events.login, response);
				this.props.history.push("/");
			}).catch(response => Observer.trigger(Observer.events.error, response.responseJSON.description));
	}

	render() {
		return (
			<div className='mt-5 pb-3'>
				<form>
					<FormTitle title='Register Form'/>

					<TextInputComponent label='Username'
										name='username'
										value={this.state.user.username}
										onInputChanged={this.onInputChanged}/>

					<TextInputComponent label='E-mail'
										name='email'
										value={this.state.user.email}
										onInputChanged={this.onInputChanged}/>

					<SelectComponent label='Country (optional)'
									 name='country'
									 value={this.state.user.country}
									 options={Countries.map(c => c.name).sort()}
									 onInputChanged={this.onInputChanged}/>

					<PasswordInputComponent label='Password'
											name='password'
											value={this.state.user.password}
											onInputChanged={this.onInputChanged}/>

					<PasswordInputComponent label='Confirm Password'
											name='confirm'
											value={this.state.user.confirm}
											onInputChanged={this.onInputChanged}/>

					<SubmitButton value='Register'
								  btnStyle='btn-primary'
								  onSubmit={this.onSubmit}/>
				</form>
			</div>
		);
	}
}

export default withRouter(RegisterForm);