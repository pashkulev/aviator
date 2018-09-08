import React from 'react';
import Label from "../common/Label";
import TextAreaField from "./TextAreaField";

function TextAreaComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<TextAreaField name={props.name}
						   value={props.value}
						   rowsCount={props.rowsCount}
						   onInputChanged={props.onInputChanged}/>
		</div>
	);
}

export default TextAreaComponent;