import React from 'react';

function Unauthorized() {
	return (

		<div className='row m-5'>
			<div className='col-12 text-center'>
				<h1 className='border border-danger'>You Are Not Authorized!</h1>
				<p className='text-center'>Please login or register!</p>
				<iframe width="420" height="315"
						src="https://www.youtube.com/embed/-4fgyXc5jkM"
						allowfullscreen="allowfullscreen">
				</iframe>
			</div>
		</div>
	);
}

export default Unauthorized;