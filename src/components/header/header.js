import React from 'react';
import './header.scss';
import Navigation from './navigation';
import Logo from '../common/logo/logo';
import SearchInput from './navigation/search-input/search-input';

const Header = (props) => {
	return (
		<header className="app-header">
			<div className="container">
				<Logo />
				<SearchInput searchTerm={props.searchTerm} updateTerm={props.updateTerm} requestUsers={props.requestUsers} />
				<Navigation isAuth={props.isAuth} />
			</div>
		</header>
	);
};

export default Header;
