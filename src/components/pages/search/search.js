import React, { Component } from 'react';
import './search.scss';
import Users from './users/users-container.js';
import SearchInput from '../../header/navigation/search-input/search-input';

export default class Search extends Component {
	state = {
		redirect: false,
	};

	onChangeSearch = (e) => {
		this.setState({
			redirect: true,
		});
	};

	render() {
		return (
			<div className="search">
				<SearchInput />
				<Users />
			</div>
		);
	}
}
