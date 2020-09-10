import React, { FC } from 'react'
import './header.scss'
import Header from './header'
import { actions as usersActions, getUsers } from '../../redux/reducers/users-reducer'
import {getPhotos} from '../../redux/reducers/pexelPhotos-reducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { selectIsAuth } from '../../redux/selectors/auth-selector'
import { selectSearchTerm, selectCurrentPage } from '../../redux/selectors/users-selector'
const {updateTerm} = usersActions

type MapStatePropsType = {
	isAuth: boolean
	searchTerm: string
	currentUsersPage: number
}

type MapDispatchPropsType = {
	updateTerm: (term: string) => void
	getUsers: (totalUsersCount:number, pageSize:number, currentPage:number, page?:'next'|'prev') => void
	getPhotos: (photosPerPage?: number) => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer:FC<PropsType> = (props) => {
	return <Header {...props} />
}
const mapStateToProps = (state: AppStateType) => ({
	isAuth: selectIsAuth(state),
	searchTerm: selectSearchTerm(state),
	currentUsersPage: selectCurrentPage(state)
})

const mapDispatchToProps = { updateTerm, getUsers, getPhotos }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer)
