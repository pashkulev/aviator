import React from 'react';
import {NavLink} from 'react-router-dom';

function AirSportBox(props) {
	return (
		<div className={props.colStyle}>
			<NavLink to={props.link}>
				<div id={props.id} className='discipline-box zoom'>
					<span className='discipline-title'>{props.title}</span>
				</div>
			</NavLink>
		</div>
	);
}

export default AirSportBox;