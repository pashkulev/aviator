import React, {Component} from 'react';
import MarketNavigation from "./MarketNavigation";
import KinveyRequester from "../../util/KinveyRequester";
import Item from "./Item";
import withAuthorization from "../../helpers/withAuthorization";

class Market extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			items: []
		};

		this.onSearch = this.onSearch.bind(this);
		this.loadAll = this.loadAll.bind(this);
	}

	async componentDidMount() {
		try {
			let items = await this.retrieveItems();
			console.log(items);
			this.setState({
				ready: true,
				items
			});
		} catch (error) {
			console.log(error);
		}
	}

	async loadAll() {
		try {
			this.setState({
				items: await this.retrieveItems()
			})
		} catch (error) {
			console.log(error);
		}
	}

	async onSearch(search) {
		try {
			let items = await this.retrieveItems();
			if (search.title) {
				items = items.filter(item => item.title.includes(search.title));
			}

			if (search.category !== "All") {
				items = items.filter(item => item.category === search.category);
			}

			this.setState({items});
		} catch (error) {
			console.log(error);
		}
	}

	retrieveItems() {
		return KinveyRequester.get('appdata', 'market', 'kinvey');
	}

	render() {
		return (
			<div className='row'>
				<MarketNavigation onSearch={this.onSearch} loadAll={this.loadAll}/>
				<div className='col-12 col-md-8 col-lg-9 bg-aviator'>
					{this.state.ready
						? this.state.items.map(item => <Item key={item._id} {...item}/>)
						: (
							<div className='row'>
								<div className='offset-5 col-7'>
									<div className='loader'>

									</div>
								</div>
							</div>
						)
					}
				</div>

			</div>
		);
	}
}

export default withAuthorization(Market);