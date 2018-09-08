import React from 'react';
import Label from "../common/Label";
import InputField from "./InputField";

function TextInputComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<InputField name={props.name}
						type='text'
						value={props.value}
						onInputChanged={props.onInputChanged}/>
		</div>
	);
}

export default TextInputComponent;