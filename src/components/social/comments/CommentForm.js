import React, {Component} from 'react';
import KinveyRequester from "../../../util/KinveyRequester";
import InputTrimmer from '../../../util/InputTrimmer';

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			comment: this.getDefaultComment()
		};

		this.onCommentChanged = this.onCommentChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onCommentChanged(event) {
		let comment = this.state.comment;
		comment.content = event.target.value;
		this.setState({comment});
	}

	onSubmit() {
		if (!this.state.comment.content.trim()) {
			return;
		}

		KinveyRequester.post('appdata', 'comments', 'kinvey', InputTrimmer.trim(this.state.comment))
			.then(comment => {
				this.setState({comment: this.getDefaultComment()});
				this.props.onCommentSubmit(comment);
			}).catch(console.log);
	}

	getDefaultComment() {
		return {
			content: '',
			likes: [],
			dislikes: [],
			author: sessionStorage.getItem("username"),
			postID: this.props.postID
		};
	}

	render() {
		return (
			<div className='p-2'>
				<div>
					<textarea rows={2}
							  name='comment'
							  value={this.state.comment.content}
							  className='form-control bg-comment'
							  placeholder='Leave a comment...'
							  onChange={this.onCommentChanged}/>
				</div>
				<div className='text-right mt-2'>
					<button onClick={this.onSubmit}
							type='button'
							className='comments-toggle-button'>
						Comment
					</button>
				</div>
			</div>
		);
	}
}

export default CommentForm;