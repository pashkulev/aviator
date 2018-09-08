import React from 'react';

function Notification(props) {
	return (
		<div className='row p-3'>
			<div className={"col-12 notification " + props.cssStyle}>
				{props.message}
			</div>
		</div>

	);
}

export default Notification;