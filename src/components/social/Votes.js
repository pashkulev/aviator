import React, {Component} from 'react';
import KinveyRequester from "../../util/KinveyRequester";

class Votes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allVotes: [],
			likes: [],
			dislikes: []
		};

		this.retrieveVotes = this.retrieveVotes.bind(this);
		this.processVote = this.processVote.bind(this);
	}

	componentDidMount = () => this.retrieveVotes();

	retrieveVotes() {
		KinveyRequester.get('appdata',
			`votes?query={"entityID":"${this.props.entityID}"}`, 'kinvey')
			.then(votes => this.setState({
				allVotes: votes,
				likes: votes.filter(vote => vote.like === "true"),
				dislikes: votes.filter(vote => vote.dislike === "true")
			}))
			.catch(console.log);
	}

	processVote(type) {
		let username = sessionStorage.getItem("username");
		let foundVote = this.state.allVotes.find(vote => vote.username === username);

		if (foundVote) {
			foundVote[type] = foundVote[type] === 'true' ? 'false' : 'true';
			if (type === 'like') {
				foundVote.dislike = 'false';
			} else {
				foundVote.like = 'false';
			}

			KinveyRequester.update('appdata', `votes/${foundVote._id}`, 'kinvey', foundVote)
				.then(response => {
					this.retrieveVotes();
					console.log(response);
				}).catch(console.log);
		} else {
			let vote = {
				like: type === 'like' ? 'true' : 'false',
				dislike: type === 'dislike' ? 'true' : 'false',
				username: username,
				entityID: this.props.entityID
			};
			KinveyRequester.post('appdata', 'votes', 'kinvey', vote)
				.then(vote => {
					console.log(vote);
					this.retrieveVotes();
				}).catch(console.log);
		}
	}

	render() {
		return (
			<span>
				<span onClick={() => this.processVote("like")}>
					<i className={'material-icons mx-2 ' + this.props.cssStyle} title='Like'>thumb_up</i>
				</span>
				<span className='mr-2'>{this.state.likes.length}</span>
				<span onClick={() => this.processVote("dislike")}>
					<i className={'material-icons mx-2 ' + this.props.cssStyle} title='Dislike'>thumb_down</i>
				</span>
				<span className='mr-2'>{this.state.dislikes.length}</span>
			</span>
		);
	}
}

export default Votes;