import React, {Component} from 'react';
import SelectComponent from "../common/form-elements/select/SelectComponent";
import Countries from "../../data/countries";
import FormTitle from "../common/form-elements/common/FormTitle";
import TextInputComponent from "../common/form-elements/input/TextInputComponent";
import SubmitButton from "../common/form-elements/common/SubmitButton";
import FlyingSpotsNavigation from "./FlyingSpotsNavigation";

import AirSports from '../../data/air-sports';
import withAuthorization from "../../helpers/withAuthorization";

class FlyingSpotsSelectForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			country: '',
			city: '',
			sport: ''
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChanged(event) {
		let queryData = this.state;
		queryData[event.target.name] = event.target.value;
		this.setState(queryData);
	}

	onSubmit() {
		alert('tuk smeee');
	}

	render() {
		return (
			<div className='row'>
				<FlyingSpotsNavigation/>
				<div className='col-12 col-md-8 col-lg-9 bg-spot-forms'>
					<form className='mt-3'>
						<FormTitle title='Find Flying Spots'/>

						<SelectComponent label='Select Country'
										 name='country'
										 value={this.state.country}
										 options={Countries.map(c => c.name).sort()}
										 onInputChanged={this.onInputChanged}/>

						<TextInputComponent label='City (optional)'
											name='city'
											value={this.state.city}
											onInputChanged={this.onInputChanged}/>

						<SelectComponent label='Select Sport'
										 name='sport'
										 value={this.state.sport}
										 options={AirSports}
										 onInputChanged={this.onInputChanged}/>

						<SubmitButton value='Search' onSubmit={this.onSubmit} btnStyle='btn-info'/>
					</form>
				</div>
			</div>

		);
	}
}

export default withAuthorization(FlyingSpotsSelectForm);