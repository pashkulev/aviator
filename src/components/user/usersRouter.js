import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Logout from "./Logout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default () => (
	<Switch>
		<Route path='/users/login' exact render={() => sessionStorage.getItem('username')
			? <Redirect to='/'/>
			: <LoginForm/>
		}/>
		<Route path='/users/register' exact render={() => sessionStorage.getItem('username')
			? <Redirect to='/'/>
			: <RegisterForm/>
		}/>
		<Route path='/users/logout' exact component={Logout}/>
	</Switch>
)


