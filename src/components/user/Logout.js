import {withRouter} from 'react-router-dom';
import KinveyRequester from "../../util/KinveyRequester";
import Observer from "../../util/Observer";

/**
 * @return {null}
 */
function Logout(props) {

	KinveyRequester.post("user", "_logout", "kinvey")
		.then(() => {
			sessionStorage.clear();
			props.history.push("/");
			Observer.trigger(Observer.events.logout);
		}).catch((error) => {
			Observer.trigger(Observer.events.error, error.statusText)
		});

	return null;
}

export default withRouter(Logout);