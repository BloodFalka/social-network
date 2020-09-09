import React, { FC, useEffect } from 'react'
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

const UsersContainer:FC<PropsType> = (props) => {
	useEffect(() => {
		props.getUsers(props.totalUsersCount, props.pageSize, props.currentPage)
		// eslint-disable-next-line
	}, [props.currentPage]);

	const onPreviousPageClick = () => {
		props.getUsers(props.totalUsersCount, props.pageSize, props.currentPage, 'prev')
	}

	const onNextPageClick = () => {
		props.getUsers(props.totalUsersCount, props.pageSize, props.currentPage, 'next')
	}

	const onFollow = (id:number) => {
		props.setFollow(id)
	}

	const onUnfollow = (id:number) => {
		props.setUnfollow(id)
	}

		const {
			isLoading,
			isFollowingProgress,
			isError,
			users,
			totalUsersCount,
			pageSize,
			currentPage,
		} = props

		return  isLoading ? (
			<Spinner />
		) : (
			<Users
				users={users}
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onUnfollow={onUnfollow}
				onFollow={onFollow}
				isFollowingProgress={isFollowingProgress}
				onPreviousPageClick={onPreviousPageClick}
				onNextPageClick={onNextPageClick}
				isAuth={props.isAuth}
			/>
		)

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
