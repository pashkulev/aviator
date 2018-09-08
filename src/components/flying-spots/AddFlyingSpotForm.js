import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withAuthorization from '../../helpers/withAuthorization';

import SelectComponent from "../common/form-elements/select/SelectComponent";
import Countries from "../../data/countries";
import FormTitle from "../common/form-elements/common/FormTitle";
import TextInputComponent from "../common/form-elements/input/TextInputComponent";
import SubmitButton from "../common/form-elements/common/SubmitButton";
import FlyingSpotsNavigation from "./FlyingSpotsNavigation";
import NumberInputComponent from "../common/form-elements/input/NumberInputComponent";
import CheckBoxInputComponent from "../common/form-elements/input/CheckBoxInputComponent";

import AirSports from '../../data/air-sports';
import Directions from '../../data/directions';
import TextAreaComponent from "../common/form-elements/text-area/TextAreaComponent";
import FlyingSpotMessages from "../../util/FlyingSpotMessages";
import AppConstants from "../../util/AppConstants";
import KinveyRequester from "../../util/KinveyRequester";
import InputTrimmer from "../../util/InputTrimmer";

class AddFlyingSpotForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			spot: {
				name: '',
				description: '',
				country: '',
				city: '',
				airSports: [],
				latitude: '',
				longitude: '',
				elevation: '',
				takeoffDirections: [],
				imageUrl: ''
			},
			error: ''
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidUpdate() {
		if (this.state.error) {
			setTimeout(() => this.setState({error: ''}), 4000);
		}
	}

	onInputChanged(event) {
		let spot = this.state.spot;
		spot[event.target.name] = event.target.value;
		this.setState({spot});
	}

	onCheckBoxClicked(event) {
		let fieldCollectionName = event.target.name;
		let spot = this.state.spot;
		let collection = spot[fieldCollectionName];
		let value = event.target.value;

		let index = collection.indexOf(value);

		if (index === -1) {
			collection.push(value);
		} else {
			collection.splice(index, 1);
		}

		spot[fieldCollectionName] = collection;

		this.setState({spot});
	}

	onSubmit() {
		if (!this.state.spot.name.trim()) {
			this.setState({error: FlyingSpotMessages.NAME_REQUIRED});
			return;
		}

		if (this.state.spot.name.trim().length < 3) {
			this.setState({error: FlyingSpotMessages.INVALID_NAME});
			return;
		}

		if (this.state.spot.country.startsWith("---") || !this.state.spot.country) {
			this.setState({error: FlyingSpotMessages.COUNTRY_REQUIRED});
			return;
		}

		if (this.state.spot.airSports.length === 0) {
			this.setState({error: FlyingSpotMessages.SPORTS_REQUIRED});
			return;
		}

		if (!this.state.spot.latitude) {
			this.setState({error: FlyingSpotMessages.LATITUDE_REQUIRED});
			return;
		}

		if (this.state.spot.latitude < -90 || this.state.spot.latitude > 90) {
			this.setState({error: FlyingSpotMessages.INVALID_LATITUDE});
			return;
		}

		if (!this.state.spot.longitude) {
			this.setState({error: FlyingSpotMessages.LONGITUDE_REQUIRED});
			return;
		}

		if (this.state.spot.longitude < -180 || this.state.spot.longitude > 180) {
			this.setState({error: FlyingSpotMessages.INVALID_LONGITUDE});
			return;
		}

		if (!this.state.spot.elevation) {
			this.setState({error: FlyingSpotMessages.ELEVATION_REQUIRED});
			return;
		}

		if (this.state.spot.elevation < 0 || this.state.spot.elevation > 8848) {
			this.setState({error: FlyingSpotMessages.INVALID_ELEVATION});
			return;
		}

		if (this.state.spot.takeoffDirections.length === 0) {
			this.setState({error: FlyingSpotMessages.INVALID_TAKEOFF_DIRECTIONS});
			return;
		}

		if (!this.state.spot.imageUrl) {
			this.setState({error: FlyingSpotMessages.IMAGE_REQUIRED});
			return;
		}

		if (!AppConstants.URL_REGEX.test(this.state.spot.imageUrl)) {
			this.setState({error: FlyingSpotMessages.INVALID_IMAGE_URL});
			return;
		}

		KinveyRequester.post('appdata', 'flying-spots', 'kinvey', InputTrimmer.trim(this.state.spot))
			.then(spot => {
				console.log(spot);
				this.props.history.push('/flying-spots');
			}).catch(console.log);

	}

	render() {
		return (
			<div className='row'>

				<FlyingSpotsNavigation/>
				<div className='col-12 col-md-8 col-lg-9 bg-spot-forms border-right'>

					<form className='mt-3'>
						{this.state.error &&
						<div className='flying-spot-error'>
							{this.state.error}
						</div>
						}
						<FormTitle title='Add Flying Spot'/>

						<TextInputComponent label='Name'
											name='name'
											value={this.state.spot.name}
											onInputChanged={this.onInputChanged}/>

						<TextAreaComponent label='Description (optional)'
										   name='description'
										   rowsCount={3}
										   value={this.state.spot.description}
										   onInputChanged={this.onInputChanged}/>

						<SelectComponent label='Country'
										 name='country'
										 value={this.state.spot.country}
										 options={Countries.map(c => c.name).sort()}
										 onInputChanged={this.onInputChanged}/>

						<TextInputComponent label='Nearby City (optional)'
											name='city'
											value={this.state.spot.city}
											onInputChanged={this.onInputChanged}/>

						<CheckBoxInputComponent label='Select Sports'
												name='airSports'
												options={AirSports}
												onCheckBoxClicked={this.onCheckBoxClicked}/>

						<NumberInputComponent label='Latitude'
											  name='latitude'
											  value={this.state.spot.latitude}
											  onInputChanged={this.onInputChanged}/>

						<NumberInputComponent label='Longitude'
											  name='longitude'
											  value={this.state.spot.longitude}
											  onInputChanged={this.onInputChanged}/>

						<NumberInputComponent label='Elevation'
											  name='elevation'
											  value={this.state.spot.elevation}
											  onInputChanged={this.onInputChanged}/>

						<CheckBoxInputComponent label='Select Takeoff Directions'
												name='takeoffDirections'
												options={Directions}
												onCheckBoxClicked={this.onCheckBoxClicked}/>

						<TextInputComponent label='Image URL'
											name='imageUrl'
											value={this.state.spot.imageUrl}
											onInputChanged={this.onInputChanged}/>

						<SubmitButton value='Add' onSubmit={this.onSubmit} btnStyle='btn-info'/>
					</form>
				</div>
			</div>

		);
	}
}

const AddFlyingSpotFormWithAuthorization = withAuthorization(AddFlyingSpotForm);
export default withRouter(AddFlyingSpotFormWithAuthorization);