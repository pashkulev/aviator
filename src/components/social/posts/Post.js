import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TimeEvaluator from "../../../util/TimeEvaluator";
import KinveyRequester from "../../../util/KinveyRequester";
import Comment from "../comments/Comment";
import Votes from "../Votes";
import CommentForm from "../comments/CommentForm";
import YouTubeEmbedder from "../../../util/YouTubeEmbedder";

class Post extends Component {

	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			isCommentInputVisible: false,
			areCommentsVisible: false
		};

		this.onCommentSubmit = this.onCommentSubmit.bind(this);
		this.onCommentDelete = this.onCommentDelete.bind(this);
		this.onPostDelete = this.onPostDelete.bind(this);
		this.switchCommentInputVisibility = this.switchCommentInputVisibility.bind(this);
		this.switchCommentsVisibility = this.switchCommentsVisibility.bind(this);
	}

	componentDidMount = () => this.retrieveComments();

	retrieveComments() {
		KinveyRequester.get('appdata', `comments?query={"postID":"${this.props.post._id}"}`, 'kinvey')
			.then(comments => this.setState({comments}))
			.catch(console.log);
	}

	onCommentSubmit(comment) {
		this.state.comments.push(comment);
		this.setState({
			isCommentInputVisible: false,
			areCommentsVisible: true
		});
	}

	onCommentDelete(commentID) {
		KinveyRequester.remove('appdata', `comments/${commentID}`, 'kinvey')
			.then(response => {
				this.retrieveComments();
				console.log(response);
			}).catch(console.log);
	}

	onPostDelete() {
		KinveyRequester.remove('appdata', `posts/${this.props.post._id}`, 'kinvey')
			.then(response => {
				console.log(response);
				this.props.onPostDelete();
			})
	}

	switchCommentInputVisibility() {
		this.setState({isCommentInputVisible: !this.state.isCommentInputVisible});
	}

	switchCommentsVisibility() {
		this.setState({areCommentsVisible: !this.state.areCommentsVisible});
	}

	render() {
		return (
			<div className='row border border-light rounded m-2'>
				{this.props.post.imageUrl &&
					<div className={`col-12 col-md-4 p-2`}>
						<img className='border rounded w-100' src={this.props.post.imageUrl} alt=""/>
					</div>
				}

				<div className={'col-12 p-2 ' + (this.props.post.imageUrl ? 'col-md-8' : '')}>
					<h2>{this.props.post.title}</h2>
					<YouTubeEmbedder content={this.props.post.content}/>
					<hr className='border border-light' />
				</div>
				<div className='col-12 d-flex justify-content-between my-1'>
					<div>
						<Votes entityID={this.props.post._id} cssStyle='post-icon'/>
						<span>
							<i onClick={this.switchCommentInputVisibility}
							   className="material-icons mx-2 post-icon"
							   title='Comment'>
								comment
							</i>
						</span>
						{(sessionStorage.getItem('username') === this.props.post.author || this.props.isAdmin) &&
							<span>
								<Link to={`/air-sports/${this.props.discipline}/posts/${this.props.post._id}/edit`}>
									<i onClick={this.switchCommentInputVisibility}
									   className="material-icons mx-2 post-icon"
									   title='Edit Post'>
										edit
									</i>
								</Link>
								<i onClick={this.onPostDelete}
								   className="material-icons mx-2 post-icon"
								   title='Delete Post'>
									delete
								</i>
							</span>
						}

						{this.state.comments.length > 0 &&
						<button type='button'
								className='comments-toggle-button align-top mx-2'
								onClick={this.switchCommentsVisibility}>
							{this.state.areCommentsVisible ? 'Hide Comments' : 'Show Comments'}
						</button>
						}
					</div>

					<div>
						{`submitted ${TimeEvaluator.calcTime(this.props.post._kmd.ect)} ago by ${this.props.post.author}`}
					</div>
				</div>
				<div className='col-12'>
					{this.state.isCommentInputVisible &&
					<CommentForm postID={this.props.post._id} onCommentSubmit={this.onCommentSubmit}/>}
					{this.state.areCommentsVisible &&
						this.state.comments.map(comment =>
							<Comment key={comment._id}
									 isAdmin={this.props.isAdmin}
									 onCommentDelete={() => this.onCommentDelete(comment._id)}
									 {...comment}/>)
					}
				</div>
			</div>
		);
	}
}

export default Post;