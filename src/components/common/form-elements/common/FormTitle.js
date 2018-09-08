import React from 'react';

function FormTitle(props) {
	return (
		<div className='form-group row'>
			<div className='offset-1 offset-md-5 col-10 col-md-6'>
				<h1>{props.title}</h1>
			</div>
		</div>
	);
}

export default FormTitle;