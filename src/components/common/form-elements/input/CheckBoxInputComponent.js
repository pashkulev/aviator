import React from 'react';
import Label from "../common/Label";

function CheckBoxInputComponent(props) {
	return (
		<div className='form-group row'>
			<Label name={props.name} label={props.label}/>
			<div className='offset-1 offset-md-0 col-10 col-md-6'>
				{props.options.map(option =>
					<div key={option} className='row'>
						<div className='col-1'>
							<input name={props.name}
								   type="checkbox"
								   value={option}
								   className='form-check mt-2'
								   onChange={props.onCheckBoxClicked}/>
						</div>
						<div className='col-10'>{option}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CheckBoxInputComponent;