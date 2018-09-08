import React from 'react';

function Label(props) {
	return (
		<div className='offset-1 col-10 col-md-4'>
			<label htmlFor={props.name}>{props.label}</label>
		</div>
	);
}

export default Label;