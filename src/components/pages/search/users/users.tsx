import React, { FC } from 'react'
import User from './user/user'
import './users.scss'
import Button from '../../../common/button/button'
import { UserType } from '../../../../types/types'

type PropsType = {
	users: Array<UserType>,
	totalUsersCount: number
	currentPage: number
	pageSize:number
	onUnfollow:(id: number)=>void
	onFollow:(id: number)=>void
	isFollowingProgress: Array<number>
	isAuth: boolean
	onPreviousPageClick: ()=>void
	onNextPageClick: ()=>void
}

const Users: FC<PropsType> = ({users, totalUsersCount, currentPage, pageSize, onUnfollow, onFollow, isFollowingProgress, isAuth, onPreviousPageClick, onNextPageClick}) => {
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
				onUnfollow={onUnfollow}
				onFollow={onFollow}
				isFollowingProgress={isFollowingProgress}
				isAuth={isAuth}
			/>
		)
	})

	return (
		<div className="users-page">
			{usersTemplate.length ? (
				<>
					<div className="title">Users</div>
					<div className="button-wrapper prev">
						<Button onClick={() => onPreviousPageClick()} text="← Show Previous Page" />
					</div>
					<div className="users">{usersTemplate}</div>
					<div className="button-wrapper next">
						<Button onClick={() => onNextPageClick()} text="Show Next Page →" />
					</div>
					<div className="information">
						<div>Total Users: {totalUsersCount}</div>
						<div>Pages: {pagesCount}</div>
						<div>Current Page: {currentPage}</div>
					</div>
				</>
			): (
				<div className="no-users">Users not found</div>
			)}

		</div>
	)
}

export default Users
