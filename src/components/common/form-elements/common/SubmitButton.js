import React from 'react';

function SubmitButton(props) {
	return (
		<div className='form-group row'>
			<div className='offset-1 offset-md-5 col-10 col-md-6'>
				<button type="button" className={'btn ' + props.btnStyle} onClick={props.onSubmit}>
					{props.value}
				</button>
			</div>
		</div>
	);
}

export default SubmitButton;