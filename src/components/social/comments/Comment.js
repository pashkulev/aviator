import React from 'react';
import TimeEvaluator from "../../../util/TimeEvaluator";
import Votes from "../Votes";

function Comment(props) {
	return (
		<div className='row m-2'>
			<div className='offset-1 offset-sm-2 col-11 col-sm-10'>
				<div className='p-2 text-black-50 border rounded comment bg-comment'>
					<div className='text-justify p-2'>{props.content}</div>
					<hr/>
					<div className='row'>
						<div className='col-12'>
							<Votes entityID={props._id} cssStyle='comment-icon'/>
							{(sessionStorage.getItem('username') === props.author || props.isAdmin) &&
								<i onClick={props.onCommentDelete}
								   className='material-icons mx-2 comment-icon'
								   title='Delete'>delete</i>
							}
						</div>
					</div>
					<div className='row'>
						<div className='col-12 text-right'>
							{`submitted ${TimeEvaluator.calcTime(props._kmd.ect)} ago by ${props.author}`}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comment;