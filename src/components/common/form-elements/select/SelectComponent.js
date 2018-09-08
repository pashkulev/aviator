import React from 'react';
import Label from "../common/Label";
import SelectField from "./SelectField";

function SelectComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<SelectField name={props.name}
						 value={props.value}
						 options={props.options}
						 onInputChanged={props.onInputChanged}/>
		</div>
	);
}

export default SelectComponent;