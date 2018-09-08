import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import SelectComponent from "../common/form-elements/select/SelectComponent";
import FormTitle from "../common/form-elements/common/FormTitle";
import TextInputComponent from "../common/form-elements/input/TextInputComponent";
import TextAreaComponent from "../common/form-elements/text-area/TextAreaComponent";
import NumberInputComponent from "../common/form-elements/input/NumberInputComponent";

import AirSports from '../../data/air-sports';
import MarketItemMessages from '../../util/MarketItemMessages';
import Observer from "../../util/Observer";
import AppConstants from "../../util/AppConstants";
import KinveyRequester from "../../util/KinveyRequester";
import InputTrimmer from "../../util/InputTrimmer";
import withAuthorization from "../../helpers/withAuthorization";

class PublishForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			item: {
				title: '',
				description: '',
				category: '',
				price: '',
				email: '',
				telephoneNumber: '',
				imageUrl: '',
				isSold: false
			}

		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChanged(event) {
		let item = this.state.item;
		item[event.target.name] = event.target.value;
		this.setState({item});
	}

	onSubmit() {
		if (!this.state.item.title.trim()) {
			Observer.trigger(Observer.events.error, MarketItemMessages.TITLE_REQUIRED);
			return;
		}

		if (this.state.item.title.trim().length < 3) {
			Observer.trigger(Observer.events.error, MarketItemMessages.INVALID_TITLE);
			return;
		}

		if (!this.state.item.description.trim()) {
			Observer.trigger(Observer.events.error, MarketItemMessages.DESCRIPTION_REQUIRED);
			return;
		}

		if (this.state.item.category.startsWith('---')) {
			Observer.trigger(Observer.events.error, MarketItemMessages.CATEGORY_REQUIRED);
			return;
		}

		if (!this.state.item.price) {
			Observer.trigger(Observer.events.error, MarketItemMessages.PRICE_REQUIRED);
			return;
		}

		if (this.state.item.price < 0) {
			Observer.trigger(Observer.events.error, MarketItemMessages.INVALID_PRICE);
			return;
		}

		if (!this.state.item.email.trim()) {
			Observer.trigger(Observer.events.error, MarketItemMessages.EMAIL_REQUIRED);
			return;
		}

		if (!AppConstants.EMAIL_REGEX.test(this.state.item.email)) {
			Observer.trigger(Observer.events.error, MarketItemMessages.INVALID_EMAIL);
			return;
		}

		if (!this.state.item.imageUrl) {
			Observer.trigger(Observer.events.error, MarketItemMessages.IMAGE_REQUIRED);
			return;
		}

		if (!AppConstants.URL_REGEX.test(this.state.item.imageUrl)) {
			Observer.trigger(Observer.events.error, MarketItemMessages.INVALID_IMAGE_URL);
			return;
		}

		KinveyRequester.post('appdata', 'market', 'kinvey', InputTrimmer.trim(this.state.item))
			.then(item => {
				console.log(item);
				this.props.history.push('/market');
			}).catch(console.log);
	}

	render() {
		return (
			<div className='row'>
				<div className='col-12 bg-spot-forms'>
					<form className='mt-3'>
						<FormTitle title='Publish Item For Sale'/>

						<TextInputComponent label='Title'
											name='title'
											value={this.state.item.title}
											onInputChanged={this.onInputChanged}/>

						<TextAreaComponent label='Description'
										   name='description'
										   value={this.state.item.description}
										   onInputChanged={this.onInputChanged}/>

						<SelectComponent label='Category'
										 name='category'
										 value={this.state.item.category}
										 options={AirSports}
										 onInputChanged={this.onInputChanged}/>

						<NumberInputComponent label='Price'
											  name='price'
											  value={this.state.item.price}
											  onInputChanged={this.onInputChanged}/>

						<TextInputComponent label='E-mail'
											name='email'
											value={this.state.item.email}
											onInputChanged={this.onInputChanged}/>

						<TextInputComponent label='Telephone (optional)'
											name='telephoneNumber'
											value={this.state.item.telephoneNumber}
											onInputChanged={this.onInputChanged}/>

						<TextInputComponent label='Image Url'
											name='imageUrl'
											value={this.state.item.imageUrl}
											onInputChanged={this.onInputChanged}/>

						<div className='form-group row'>
							<div className='offset-1 offset-md-5 col-10 col-md-6'>
								<button type="button" className='btn btn-primary mt-1' onClick={this.onSubmit}>
									Publish
								</button>
								<Link className='btn btn-outline-dark mt-1 ml-2' to='/market'>Cancel</Link>
							</div>
						</div>

					</form>
				</div>
			</div>

		);
	}
}

const PublishFormWithAuthorization = withAuthorization(PublishForm);
export default withRouter(PublishFormWithAuthorization);