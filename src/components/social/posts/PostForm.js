import React from 'react';
import {withRouter} from 'react-router-dom';
import AppMessages from '../../../util/AppMessages';
import KinveyRequester from '../../../util/KinveyRequester';
import FormTitle from "../../common/form-elements/common/FormTitle";
import TextInputComponent from "../../common/form-elements/input/TextInputComponent";
import SubmitButton from "../../common/form-elements/common/SubmitButton";
import Observer from "../../../util/Observer";
import TextAreaComponent from "../../common/form-elements/text-area/TextAreaComponent";
import SideBar from "../../common/navigation/SideBar";
import InputTrimmer from "../../../util/InputTrimmer";
import AppConstants from "../../../util/AppConstants";
import withAuthorization from "../../../helpers/withAuthorization";

class PostForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isEditLoaded: false,
			post: {
				content: '',
				author: sessionStorage.getItem("username"),
				title: '',
				imageUrl: '',
				category: this.props.match.params.discipline
			}
		};

		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChanged(event) {
		let post = this.state.post;
		post[event.target.name] = event.target.value;
		this.setState({post});
	}

	onSubmit() {
		if (!this.state.post.content.trim()) {
			Observer.trigger(Observer.events.error, AppMessages.POST_CONTENT_REQUIRED);
			return;
		}

		if (this.state.post.imageUrl.trim() && !AppConstants.URL_REGEX.test(this.state.post.imageUrl)) {
			Observer.trigger(Observer.events.error, AppMessages.INVALID_IMAGE_URL);
			return;
		}

		let postID = this.props.match.params.id;
		let action = postID ? 'update' : 'post';
		let endpoint = 'posts';

		if (postID) {
			endpoint += '/' + postID;
		}

		KinveyRequester[action]('appdata', endpoint, 'kinvey', InputTrimmer.trim(this.state.post))
			.then(response => {
				response.message = AppMessages.POST_CREATED;
				let message = postID ? AppMessages.POST_EDITED : AppMessages.POST_CREATED;
				Observer.trigger(Observer.events.success, message);
				this.props.history.push(`/air-sports/${this.props.match.params.discipline}`);
			}).catch(response => Observer.trigger(Observer.events.error, response.responseJSON.description));
	}

	render() {
		let postID = this.props.match.params.id;
		let formTitle = 'Add New Post';
		let submitButtonText = "Post";

		if (postID) {
			formTitle = "Edit Post";
			submitButtonText = "Edit";
		}

		if (postID && !this.state.isEditLoaded) {
			KinveyRequester.get('appdata', `posts/${postID}`, 'kinvey')
				.then(post => this.setState({
					post,
					isEditLoaded: true
				}))
				.catch(console.log);

		}

		return (
			<div className='row'>
				<SideBar discipline={this.props.match.params.discipline}/>
				<div className='col-12 col-md-8 col-lg-9 post-form-area bg-aviator'>
					<div className='mt-5 pb-5'>
						<form className='border border-light rounded py-3'>
							<FormTitle title={formTitle}/>
							<TextInputComponent label='Title (optional)'
												name='title'
												type='text'
												value={this.state.post.title}
												onInputChanged={this.onInputChanged}/>

							<TextAreaComponent label='Content'
											   name='content'
											   type='text'
											   value={this.state.post.content}
											   onInputChanged={this.onInputChanged}/>

							<TextInputComponent label='Image URL (optional)'
												name='imageUrl'
												type='text'
												value={this.state.post.imageUrl}
												onInputChanged={this.onInputChanged}/>


							<SubmitButton value={submitButtonText}
										  btnStyle='btn-success'
										  onSubmit={this.onSubmit}/>
						</form>
					</div>
				</div>
			</div>

		);
	}
}

const PostFormWithAuthorization = withAuthorization(PostForm);
export default withRouter(PostFormWithAuthorization);