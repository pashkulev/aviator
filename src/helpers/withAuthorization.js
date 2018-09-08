import React, {Component} from 'react';
import Unauthorized from "../components/Unauthorized";

function withAuthorization(WrappedComponent) {
	return class extends Component {
		render() {
			if (sessionStorage.getItem('username')) {
				return <WrappedComponent {...this.props} />;
			}

			return <Unauthorized/>
		}
	};
}

export default withAuthorization;
