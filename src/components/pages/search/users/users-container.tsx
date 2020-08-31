import React, { Component } from 'react'
import Users from './users'
import { getUsers, setFollow, setUnfollow } from '../../../../redux/reducers/users-reducer'
import { connect } from 'react-redux'
import Spinner from '../../../common/spinner/spinner'
import { compose } from 'redux'
import {
	selectUsers,
	selectPageSize,
	selectTotalUsersCount,
	selectCurrentPage,
	selectIsLoading,
	selectIsFollowingProgress,
	selectIsError,
} from '../../../../redux/selectors/users-selector'
import { selectIsAuth } from '../../../../redux/selectors/auth-selector'
import { AppStateType } from '../../../../redux/store'
import { UserType } from '../../../../types/types'

type MapStatePropsType = {
	users: Array<UserType>,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isLoading: boolean,
	isFollowingProgress: Array<number>,
	isError: boolean,
	isAuth: boolean,
}

type MapDispatchPropsType = {
	getUsers:(totalUsersCount:number, pageSize:number, currentPage:number, page?:'prev'|'next', friends?:boolean)=>void
	setFollow:(userId:number)=>void
	setUnfollow:(userId:number)=>void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends Component<PropsType> {
	componentDidMount() {
		this.props.getUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage)
	}

	onPreviousPageClick = () => {
		this.props.getUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage, 'prev')
	}

	onNextPageClick = () => {
		this.props.getUsers(this.props.totalUsersCount, this.props.pageSize, this.props.currentPage, 'next')
	}

	onFollow = (id:number) => {
		this.props.setFollow(id)
	}

	onUnfollow = (id:number) => {
		this.props.setUnfollow(id)
	}

	render() {
		const {
			isLoading,
			isFollowingProgress,
			isError,
			users,
			totalUsersCount,
			pageSize,
			currentPage,
		} = this.props

		return isError ? (
			<img src="https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png" alt="Error" />
		) : isLoading ? (
			<Spinner />
		) : (
			<Users
				users={users}
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onUnfollow={this.onUnfollow}
				onFollow={this.onFollow}
				isFollowingProgress={isFollowingProgress}
				onPreviousPageClick={this.onPreviousPageClick}
				onNextPageClick={this.onNextPageClick}
				isAuth={this.props.isAuth}
			/>
		)
	}
}

const mapStateToProps = (state: AppStateType) => ({
	users: selectUsers(state),
	pageSize: selectPageSize(state),
	totalUsersCount: selectTotalUsersCount(state),
	currentPage: selectCurrentPage(state),
	isLoading: selectIsLoading(state),
	isFollowingProgress: selectIsFollowingProgress(state),
	isError: selectIsError(state),
	isAuth: selectIsAuth(state),
})

const mapDispatchToProps = {
	getUsers,
	setFollow,
	setUnfollow,
}

export default compose(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps))(UsersContainer)
