import React from 'react';

function InputField(props) {
	return (
		<div className='offset-1 offset-md-0 col-10 col-md-6'>
			<input type={props.type}
				   name={props.name}
				   id={props.name}
				   value={props.value}
				   className='form-control'
				   onChange={props.onInputChanged}/>
		</div>
	);
}

export default InputField;