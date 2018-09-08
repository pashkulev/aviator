import React, {Component} from 'react';

const ACCUWEATHER_BASE_URL = 'http://dataservice.accuweather.com/';
const ACCUWEATHER_APP_KEY = '?apikey=AcSEv7J1aTvTklDzc6zxaZ3foDc0kAA9';
const GEO_POSITION_ENDPOINT = 'locations/v1/cities/geoposition/search';
const CURRENT_CONDITIONS_ENDPOINT = 'currentconditions/v1/';



class WeatherBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			locationData: null,
			weatherData: null
		};
	}

	componentDidMount() {
		let locationUrl =
			ACCUWEATHER_BASE_URL +
			GEO_POSITION_ENDPOINT +
			ACCUWEATHER_APP_KEY +
			`&q=${this.props.latitude},${this.props.longitude}`;

		fetch(locationUrl)
			.then(response => response.json())
			.then(locationData => {
				let currentConditionsUrl =
					ACCUWEATHER_BASE_URL +
					CURRENT_CONDITIONS_ENDPOINT +
					locationData.Key +
					ACCUWEATHER_APP_KEY +
					'&details=true';

				fetch(currentConditionsUrl)
					.then(response => response.json())
					.then(weatherData => {
						console.log(weatherData);

						this.setState({
							ready: true,
							locationData,
							weatherData: weatherData[0]
						});
					}).catch(console.log);
			}).catch(console.log);
	}

	render() {
		if (!this.state.ready) {
			return (
				<div className='row'>
					<div className='offset-5 col-7'>
						<div className='loader'>

						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='p-3 bg-weather'>
				<h3 className='text-center'>Current Weather</h3>
				<hr className='border-light'/>
				<div>{this.state.weatherData.WeatherText}</div>
				<hr className='border-light'/>
				<div className='row'>
					<div className='col-12 col-lg-5'>Temperature:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.Temperature.Metric.Value}&deg;C
						| {this.state.weatherData.Temperature.Imperial.Value}&deg;F
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-lg-5'>Feels like:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.RealFeelTemperature.Metric.Value}&deg;C
						| {this.state.weatherData.RealFeelTemperature.Imperial.Value}&deg;F
					</div>
				</div>
				<hr className='border-light'/>
				<div className='row'>
					<div className='col-12 col-lg-5'>Pressure:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.Pressure.Metric.Value}mb
						| {this.state.weatherData.Pressure.Imperial.Value}inHg
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-lg-5'>Pressure Tendency:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.PressureTendency.LocalizedText}
					</div>
				</div>
				<hr className='border-light'/>
				<div className='row'>
					<div className='col-12 col-lg-5'>Relative Humidity:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.RelativeHumidity}%
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-lg-5'>Dew Point:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.DewPoint.Metric.Value}&deg;C
						| {this.state.weatherData.DewPoint.Imperial.Value}&deg;F
					</div>
				</div>
				<div>
					<h5 className='text-center border rounded mt-3'>Wind</h5>
					<div className='row'>
						<div className='col-12 col-lg-5'>Direction:</div>
						<div className='col-12 col-lg-7'>
							{this.state.weatherData.Wind.Direction.English}
						</div>
					</div>
					<div className='row'>
						<div className='col-12 col-lg-5'>Speed:</div>
						<div className='col-12 col-lg-7'>
							{this.state.weatherData.Wind.Speed.Metric.Value}km/h
							| {this.state.weatherData.Wind.Speed.Imperial.Value}mi/h
						</div>
					</div>
					<div className='row'>
						<div className='col-12 col-lg-5'>Gusts:</div>
						<div className='col-12 col-lg-7'>
							{this.state.weatherData.WindGust.Speed.Metric.Value}km/h
							| {this.state.weatherData.WindGust.Speed.Imperial.Value}mi/h
						</div>
					</div>
				</div>
				<hr className='border-light'/>
				<div className='row'>
					<div className='col-12 col-lg-5'>UV Index:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.UVIndexText}
					</div>
				</div>
				<hr className='border-light'/>
				<div className='row'>
					<div className='col-12 col-lg-5'>Visibility:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.Visibility.Metric.Value}km
						| {this.state.weatherData.Visibility.Imperial.Value}mi
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-lg-5'>Cloud Coverage:</div>
					<div className='col-12 col-lg-7'>
						{this.state.weatherData.CloudCover}%
					</div>
				</div>
			</div>
		);
	}
}

export default WeatherBox;