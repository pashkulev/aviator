import React from 'react';
import AppMessages from '../../util/AppMessages';
import KinveyRequester from '../../util/KinveyRequester';
import FormTitle from "../common/form-elements/common/FormTitle";
import TextInputComponent from "../common/form-elements/input/TextInputComponent";
import SubmitButton from "../common/form-elements/common/SubmitButton";
import Observer from "../../util/Observer";
import PasswordInputComponent from "../common/form-elements/input/PasswordInputComponent";

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			payload: {
				username: '',
				password: ''
			}
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChanged(event) {
		let payload = this.state.payload;
		payload[event.target.name] = event.target.value.trim();
		this.setState({payload});
	}

	onSubmit() {
		if (!this.state.payload.username.trim()) {
			Observer.trigger(Observer.events.error, AppMessages.USERNAME_REQUIRED);
			return;
		}

		if (this.state.payload.username.trim().length < 3) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_USERNAME);
			return;
		}

		if (!this.state.payload.password) {
			Observer.trigger(Observer.events.error, AppMessages.PASSWORD_REQUIRED);
			return;
		}

		if (this.state.payload.password.length < 8 || this.state.payload.password.length > 20) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_PASSWORD);
			return;
		}

		KinveyRequester.post('user', 'login', 'basic', this.state.payload)
			.then(response => {
				console.log(response);
				response.message = AppMessages.LOGIN_SUCCESSFUL;
				Observer.trigger(Observer.events.login, response);
				this.props.history.push("/");
			}).catch(response => Observer.trigger(Observer.events.error, response.responseJSON.description));
	}

	render() {

		return (
			<div className='mt-5 pb-5'>
				<form>
					<FormTitle title='Login Form'/>

					<TextInputComponent label='Username'
										name='username'
										value={this.state.payload.username}
										onInputChanged={this.onInputChanged}/>

					<PasswordInputComponent label='Password'
											name='password'
											value={this.state.payload.password}
											onInputChanged={this.onInputChanged}/>

					<SubmitButton value='Login'
								  btnStyle='btn-success'
								  onSubmit={this.onSubmit}/>
				</form>
			</div>
		);
	}
}

export default LoginForm;