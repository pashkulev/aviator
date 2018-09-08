import React from 'react';
import {NavLink} from 'react-router-dom';

function AnonymousSection() {
	return (
		<div>
			<NavLink to='/users/login' className='btn btn-success m-1'>Login</NavLink>
			<NavLink to='/users/register' className='btn btn-primary m-1'>Register</NavLink>
		</div>
	);
}

export default AnonymousSection;