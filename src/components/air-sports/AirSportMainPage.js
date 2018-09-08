import React, {Component} from 'react';
import SideBar from "../common/navigation/SideBar";
import KinveyRequester from "../../util/KinveyRequester";
import Post from "../social/posts/Post";

class AirSportMainPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: sessionStorage.getItem("username") !== null,
			ready: false,
			posts: []
		};

		this.retrievePosts = this.retrievePosts.bind(this);
	}

	componentDidMount() {
		this.retrievePosts();
	}

	retrievePosts() {
		KinveyRequester.get('appdata',
			`posts?query={"category":"${this.props.discipline}"}&sort={"_kmd.ect": -1}`,
			'kinvey').then(posts => this.setState({posts, ready: true}))
			.catch(console.log);
	}

	render() {
		return (
			<div className='row bg-aviator'>
				<SideBar discipline={this.props.discipline}/>
				<div className='col-12 col-md-8 col-lg-9 post-form-area posts'>
					{this.state.posts.map(post =>
						<Post key={post._id}
							  discipline={this.props.discipline}
							  post={post}
							  onPostDelete={this.retrievePosts}
							  isAdmin={this.props.isAdmin}/>)}
				</div>
			</div>
		);
	}
}

export default AirSportMainPage;

