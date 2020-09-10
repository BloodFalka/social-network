import React, { FC } from 'react'
import './header.scss'
import Navigation from './navigation/navigation'
import Logo from '../common/logo/logo'
import SearchInput from './navigation/search-input/search-input'

type PropsType = {
	searchTerm: string,
	currentUsersPage: number,
	updateTerm: (term: string) => void
	getUsers: (totalUsersCount:number, pageSize:number, currentPage:number, page?:'next'|'prev') => void
	getPhotos: (photosPerPage?: number) => void,
	isAuth: boolean
}

const Header: FC<PropsType> = ({
	searchTerm,
	currentUsersPage,
	updateTerm,
	getUsers,
	isAuth,
	getPhotos
}) => {
	return (
		<header className="app-header">
			<div className="container">
				<Logo />
				<SearchInput
					currentUsersPage={currentUsersPage}
					searchTerm={searchTerm}
					updateTerm={updateTerm}
					getUsers={getUsers}
					getPhotos={getPhotos}
				/>
				<Navigation isAuth={isAuth} />
			</div>
		</header>
	)
}

export default Header
