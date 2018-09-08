import React from 'react';
import {Link} from 'react-router-dom';

function LoggedInSection(props) {
	return (
		<ul className="navbar-nav ml-auto">
			<li className='nav-item'>
				<Link to="/" className='nav-link'>Welcome {props.username}!</Link>
			</li>
			<li className="nav-item dropdown">
				<a className="nav-link" href="" id="navbarDropdown" role="button"
				   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="material-icons">account_box</i>
				</a>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item" to={`/users/${props.username}`}>Profile</Link>
					{props.isAdmin && <Link className="dropdown-item" to='/admin'>Admin Panel</Link>}
					<div className="dropdown-divider">

					</div>
					<Link className="dropdown-item" to="/users/logout">Logout</Link>
				</div>
			</li>
		</ul>
	);
}

export default LoggedInSection;