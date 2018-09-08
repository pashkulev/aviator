import React from 'react';
import Label from "../common/Label";
import InputField from "./InputField";

function PasswordInputComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<InputField name={props.name}
						type='password'
						value={props.value}
						onInputChanged={props.onInputChanged}/>
		</div>
	);
}

export default PasswordInputComponent;