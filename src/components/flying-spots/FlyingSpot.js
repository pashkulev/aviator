import React from 'react';
import {Link} from 'react-router-dom';

function FlyingSpot(props) {
	return (
		<div className='row bg-aviator text-white py-2'>
			<div className='col-12 col-sm-6 col-md-4'>
				<Link to={`/flying-spots/${props._id}/details`}>
					<img className='w-100 spot-image' src={props.imageUrl} alt={`${props.name} takeoff`}/>
				</Link>
			</div>
			<div className='col-12 col-sm-6 col-md-8'>
				<h2>{props.name}, {props.country}</h2>
				<hr className='border border-light'/>
				<div>Activities: {props.airSports.join(", ")}</div>
				<div>Take-off directions: {props.takeoffDirections.join(", ")}</div>
				<div>Elevation: {props.elevation} m</div>
				<div className='text-right my-2'>
					<Link className='btn btn-primary' to={`/flying-spots/${props._id}/details`}>View Details</Link>
				</div>
			</div>
		</div>
	);
}

export default FlyingSpot;