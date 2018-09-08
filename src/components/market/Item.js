import React, {Component} from 'react';

class Item extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='row text-white m-2 pt-2 border border-light'>
				<div className='col-12 col-md-5'>
					<img className='w-75 item-image' src={this.props.imageUrl} alt={this.props.title}/>
				</div>
				<div className='col-12 col-md-7'>
					<h4>{this.props.title}</h4>
					<div>{this.props.description}</div>
					<hr className='border-light'/>
					<div className='row'>
						<div className='col-12 col-md-6'>Price:</div>
						<div className='col-12 col-md-6'>{this.props.price}&euro;</div>
					</div>
					<div className='row'>
						<div className='col-12 col-md-6'>Category:</div>
						<div className='col-12 col-md-6'>{this.props.category}</div>
					</div>
					{sessionStorage.getItem('username') &&
						<div className='pb-2'>
							<hr className='border-light'/>
							<div className='row'>
								<div className='col-12 col-md-6'>Email:</div>
								<div className='col-12 col-md-6'>{this.props.email}</div>
							</div>
							{this.props.telephoneNumber &&
								<div className='row'>
									<div className='col-12 col-md-6'>Telephone Numner:</div>
									<div className='col-12 col-md-6'>{this.props.telephoneNumber}</div>
								</div>
							}
						</div>

					}

				</div
				>

			</div>
		);
	}
}

export default Item;