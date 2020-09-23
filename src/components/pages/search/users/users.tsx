import React, { FC, useEffect } from 'react'
import User from './user/user'
import './users.scss'
import Button from '../../../common/button/button'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectCurrentPage,
	selectIsLoading,
	selectPageSize,
	selectTotalUsersCount,
	selectUsers,
	selectIsFollowingProgress,
} from '../../../../redux/selectors/users-selector'
import { selectIsAuth, selectUserId } from '../../../../redux/selectors/auth-selector'
import queryString from 'querystring'

import { getUsers } from '../../../../redux/reducers/users-reducer'
import Spinner from '../../../common/spinner/spinner'
import { useHistory } from 'react-router-dom'

export const Users: FC = (props) => {
	const users = useSelector(selectUsers),
		totalUsersCount = useSelector(selectTotalUsersCount),
		currentPage = useSelector(selectCurrentPage),
		pageSize = useSelector(selectPageSize),
		isLoading = useSelector(selectIsLoading),
		isFollowingProgress = useSelector(selectIsFollowingProgress),
		isAuth = useSelector(selectIsAuth),
		currentUserId = useSelector(selectUserId)

	const dispatch = useDispatch()

	const history = useHistory()

	useEffect(() => {
		const actualQuery = queryString.parse(history.location.search.substr(1)) as {term: string, usersPage:string }
		if(actualQuery.usersPage){
			dispatch(getUsers(pageSize, currentPage))
		}else{
			dispatch(getUsers(pageSize, 1))
		}

		// eslint-disable-next-line
	}, [])

	const onPageChanged = (page: 'prev' | 'next') => {
		const prevPage = currentPage - 1 < 1 ? Math.ceil(totalUsersCount / pageSize) : currentPage - 1
		const nextPage = currentPage + 1 > Math.ceil(totalUsersCount / pageSize) ? 1 : currentPage + 1
		dispatch(getUsers(pageSize, page === 'prev' ? prevPage : nextPage))
	}

	const pagesCount =
		(totalUsersCount / pageSize) % 1 === 0
			? totalUsersCount / pageSize
			: Math.ceil(totalUsersCount / pageSize)

	const usersTemplate = users.map((item) => {
		return (
			<User
				id={item.id}
				key={item.id}
				name={item.name}
				avatar={item.photos.large}
				status={item.status}
				followed={item.followed}
				isFollowingProgress={isFollowingProgress}
				isAuth={isAuth}
				currentUserId={currentUserId}
			/>
		)
	})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="users-page">
					{usersTemplate.length ? (
						<>
							<div className="title">Users</div>
							{pagesCount > 1 ? (
								<div className="button-wrapper prev">
									<Button onClick={() => onPageChanged('prev')} text="← Show Previous Page" />
								</div>
							) : null}
							<div className="users">{usersTemplate}</div>
							{pagesCount > 1 ? (
								<div className="button-wrapper next">
									<Button onClick={() => onPageChanged('next')} text="Show Next Page →" />
								</div>
							) : null}
							<div className="information">
								<div>Total Users: {totalUsersCount}</div>
								<div>Pages: {pagesCount}</div>
								<div>Current Page: {currentPage}</div>
							</div>
						</>
					) : (
						<div className="no-users">Users not found</div>
					)}
				</div>
			)}
		</>
	)
}
