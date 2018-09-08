import React from 'react';
import {NavLink} from 'react-router-dom';

function Menu() {
	return (
		<ul className="navbar-nav mr-auto">
			<li className="nav-item">
				<NavLink activeClassName='active' exact className="nav-link" to="/">Home</NavLink>
			</li>
			<li className="nav-item">
				<NavLink activeClassName='active' className="nav-link" to="/air-sports">Air Sports</NavLink>
			</li>
			{sessionStorage.getItem("username") &&
				<li className="nav-item">
					<NavLink activeClassName='active' className="nav-link" to="/flying-spots">
						Places to Fly
					</NavLink>
				</li>
			}
			{sessionStorage.getItem("username") &&
				<li className="nav-item">
					<NavLink activeClassName='active' className="nav-link" to="/market">Market</NavLink>
				</li>
			}
		</ul>
	);
}

export default Menu;