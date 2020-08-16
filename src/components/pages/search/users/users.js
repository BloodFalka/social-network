import React from 'react';
import User from './user';
import './users.scss';
import Button from '../../../common/button';

const Users = (props) => {
	const { users, totalUsersCount, currentPage, pageSize, onUnfollow, onFollow, isFollowingProgress } = props;
	const pagesCount =
		(totalUsersCount / pageSize) % 1 === 0 ? totalUsersCount / pageSize : Math.ceil(totalUsersCount / pageSize);
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
				isAuth={props.isAuth}
			/>
		);
	});

	return (
		<div className="users-page">
			{pagesCount > 1 && (
				<div className="button-wrapper prev">
					<Button onClick={() => props.onPreviousPageClick()} text="← Show Previous Page" />
				</div>
			)}
			{usersTemplate.length ? (
				<div className="users">{usersTemplate}</div>
			) : (
				<div className="no-users">Users not found</div>
			)}
			{pagesCount > 1 && (
				<div className="button-wrapper next">
					<Button onClick={() => props.onNextPageClick()} text="Show Next Page →" />
				</div>
			)}

			<div className="information">
				<div>Total Users: {totalUsersCount}</div>
				<div>Pages: {pagesCount}</div>
				<div>Current Page: {currentPage}</div>
			</div>
		</div>
	);
};

export default Users;
