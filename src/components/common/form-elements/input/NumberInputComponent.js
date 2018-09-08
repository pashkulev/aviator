import React from 'react';
import Label from "../common/Label";
import InputField from "./InputField";

function NumberInputComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<InputField name={props.name}
						type="number"
						value={props.value}
						onInputChanged={props.onInputChanged}/>
		</div>
	);
}

export default NumberInputComponent;