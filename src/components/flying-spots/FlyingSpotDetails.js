import React, {Component} from 'react';
import FlyingSpotsNavigation from "./FlyingSpotsNavigation";
import KinveyRequester from "../../util/KinveyRequester";
import WeatherBox from "./WeatherBox";
import Votes from "../social/Votes";
import withAuthorization from "../../helpers/withAuthorization";

class FlyingSpotDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			spot: null
		};
	}

	componentDidMount() {
		KinveyRequester.get('appdata', `flying-spots/${this.props.id}`, 'kinvey')
			.then(spot => this.setState({spot}))
			.catch(console.log);
	}

	render() {
		return (
			<div className='row bg-aviator'>
				<FlyingSpotsNavigation/>
				<div className='col-12 col-md-8 col-lg-9'>
					{this.state.spot === null
						? (
							<div className='row'>
								<div className='offset-5 col-7'>
									<div className='loader'>

									</div>
								</div>
							</div>
						)
						: (
							<div className='row text-white'>
								<div className='col-12 col-md-8'>
									<div className='row my-2'>
										<div className='col-6'>
											<img className='w-100 spot-image'
												 src={this.state.spot.imageUrl}
												 alt={`${this.state.spot.name} takeoff`}/>
										</div>
										<div className='col-6'>
											<h1>{this.state.spot.name}</h1>
											<h4>{this.state.spot.country}</h4>
											<div>Elevation: {this.state.spot.elevation} m</div>
											<div className='mt-3'>
												<Votes entityID={this.props.id} cssStyle='post-icon'/>
											</div>
										</div>
									</div>
									<hr className='border border-light'/>
									{this.state.spot.description &&
										<div>
											<h4>Description</h4>
											<div>{this.state.spot.description}</div>
										</div>
									}
									<hr className='border border-light'/>
									<div className='row'>
										<div className='col-6'>
											Activities:
										</div>
										<div className='col-6'>
											{this.state.spot.airSports.map(sport => <div key={sport}>{sport}</div>)}
										</div>
									</div>
									<hr className='border border-light'/>
									<h4>GPS Coordinates</h4>
									<div className='row'>
										<div className='col-6'>
											<div>Latitude</div>
											<div>{this.state.spot.latitude}</div>
										</div>
										<div className='col-6'>
											<div>Longitude</div>
											<div>{this.state.spot.longitude}</div>
										</div>
									</div>
									<hr className='border border-light'/>
									<div className='row mb-4'>
										<div className='col-6'>
											Take-off directions:
										</div>
										<div className='col-6'>
											{this.state.spot.takeoffDirections.join(", ")}
										</div>
									</div>
								</div>
								<div className='col-12 col-md-4 border-left p-0'>
									<WeatherBox latitude={this.state.spot.latitude}
												longitude={this.state.spot.longitude}/>
								</div>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default withAuthorization(FlyingSpotDetails);