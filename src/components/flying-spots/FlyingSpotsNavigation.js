import React from 'react';
import {NavLink} from 'react-router-dom';

function FlyingSpotsNavigation() {
	return (
		<div className='col-12 col-md-4 col-lg-3 p-0 text-center bg-aviator'>
			<NavLink to='/flying-spots'>
				<div className='flying-spots-menu'>Last Added Spots</div>
			</NavLink>
			<NavLink to='/flying-spots/add'>
				<div className='flying-spots-menu'>Add Flying Spot</div>
			</NavLink>
			<NavLink to='/flying-spots/find'>
				<div className='flying-spots-menu'>Find Flying Spots</div>
			</NavLink>
		</div>
	);
}

export default FlyingSpotsNavigation;