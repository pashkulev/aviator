import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import AirSports from '../../data/air-sports';
import InputTrimmer from "../../util/InputTrimmer";

class MarketNavigation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			search: {
				title: '',
				category: 'All'
			},
			filterIsVisible: false
		};

		this.switchFilterVisibility = this.switchFilterVisibility.bind(this);
		this.onInputChanged = this.onInputChanged.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}

	switchFilterVisibility() {
		this.setState({filterIsVisible: !this.state.filterIsVisible});
	}

	onInputChanged(event) {
		let search = this.state.search;
		search[event.target.name] = event.target.value;
		this.setState({search});
	}

	onSearch() {
		if (!this.state.search.title.trim() && this.state.search.category === 'All') {
			return;
		}

		let url = `/market?category=${this.state.search.category}&title=${this.state.search.title.trim()}`;
		this.props.onSearch(InputTrimmer.trim(this.state.search));
		this.props.history.push(url);
	}

	render() {
		return (
			<div className='col-12 col-md-4 col-lg-3 p-0 text-center bg-aviator'>
				<NavLink to='/market'>
					<div onClick={() => this.props.loadAll()} className='flying-spots-menu'>All Items</div>
				</NavLink>
				{!this.props.location.pathname.endsWith('publish') &&
					<div>
						<div onClick={this.switchFilterVisibility} className='flying-spots-menu'>Search Items</div>
						{this.state.filterIsVisible &&
							<form className='p-2 text-white'>
								<label>By Title</label>
								<input type='text'
									   name='title'
									   value={this.state.search.title}
									   placeholder='search text...'
									   className='form-control'
									   onChange={this.onInputChanged}/>
								<label className='mt-2'>By Category</label>
								<select name='category'
										value={this.state.search.category}
										className='form-control'
										onChange={this.onInputChanged}>
									<option>All</option>
									{AirSports.map(airSport => <option key={airSport}>{airSport}</option>)}
								</select>
								<button className='w-100 mt-2 btn btn-outline-success'
										type='button'
										onClick={this.onSearch}>
									Search...
								</button>
							</form>
						}
					</div>
				}

				<NavLink to='/market/publish'>
					<div className='flying-spots-menu'>Publish Item</div>
				</NavLink>
			</div>
		);
	}
}

export default withRouter(MarketNavigation);