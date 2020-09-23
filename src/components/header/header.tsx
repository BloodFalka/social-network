import React, { FC } from 'react'
import './header.scss'
import Navigation from './navigation/navigation'
import Logo from '../common/logo/logo'
import SearchInput from './navigation/search-input/search-input'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/selectors/auth-selector'

const Header: FC = (props) => {
	const isAuth = useSelector(selectIsAuth)
	return (
		<header className="app-header">
			<div className="container">
				<Logo />
				<SearchInput />
				<Navigation isAuth={isAuth} />
			</div>
		</header>
	)
}

export default Header
