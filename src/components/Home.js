import React, {Component} from 'react';
import FadeIn from 'react-fade-in';

const messages = [
	"Welcome to the Aviators Network...",
	"Join our community of pilots from all over the world...",
	"Share with us your flying adventures...",
	"Find new flying friends...",
	"Share the dream..."
];

let index = 0;

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: messages[index]
		}
	}

	componentDidMount() {
		this.timerId = setInterval(() => {
			index = (index + 1) % messages.length;
			this.setState({message: messages[index]});
		}, 3000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		return (
			<div className='row welcome'>
				<div className='col-12 text-center mt-5'>
					<FadeIn>
						<h1 className='welcome-message'>{this.state.message}</h1>
					</FadeIn>
				</div>
			</div>
		);
	}
}

export default Home;