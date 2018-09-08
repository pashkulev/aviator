import React from 'react';

function SelectField(props) {
	return (
		<div className='offset-1 offset-md-0 col-10 col-md-6'>
			<select name={props.name}
					id={props.name}
					value={props.value}
					className='form-control'
					onChange={props.onInputChanged}>
				<option>---Select {props.name}---</option>
				{props.options.map(opt => <option key={opt}>{opt}</option>)}
			</select>
		</div>
	);
}

export default SelectField;