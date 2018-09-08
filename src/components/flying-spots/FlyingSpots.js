import React, {Component} from 'react';
import FlyingSpotsNavigation from "./FlyingSpotsNavigation";
import KinveyRequester from "../../util/KinveyRequester";
import FlyingSpot from "./FlyingSpot";
import withAuthorization from "../../helpers/withAuthorization";

class FlyingSpots extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			flyingSpots: []
		};
	}

	componentDidMount() {
		KinveyRequester.get('appdata', 'flying-spots', 'kinvey')
			.then(flyingSpots => this.setState({
				flyingSpots,
				ready: true
			}))
			.catch(console.log);
	}

	render() {
		return (
			<div className='row  bg-aviator'>
				<FlyingSpotsNavigation/>
				<div className='col-12 col-md-8 col-lg-9'>
					{this.state.ready
						? this.state.flyingSpots.map(spot => <FlyingSpot key={spot._id} {...spot}/>)
						: (
							<div className='row'>
								<div className='offset-5 col-7'>
									<div className='loader'>

									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default withAuthorization(FlyingSpots);