import React, { FC } from 'react'
import Button from '../../../../common/button/button'
import './user.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
	name: string
	status: string
	followed: boolean
	id: number
	onUnfollow:(id: number)=>void
	onFollow:(id: number)=>void
	isFollowingProgress: Array<number>
	avatar: string|null
	isAuth: boolean
}

const User: FC<PropsType> = ({
	name,
	status,
	followed,
	id,
	onFollow,
	onUnfollow,
	isFollowingProgress,
	avatar,
	isAuth,
}) => {
	const buttonText = followed ? 'UNFOLLOW' : 'FOLLOW'
	const buttonColor = followed ? '#f92b66' : '#00b8ff'
	const avatarTemplate = {
		backgroundImage: `url(${
			avatar || 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
		})`,
	}

	return (
		<div className="user">
			<NavLink to={`profile/${id}`} className="avatar-nav">
				<div className="avatar" style={avatarTemplate}></div>
			</NavLink>
			<div className="description">
				<div className="name">{name}</div>
				<div className="status">{status}</div>
				{isAuth && (
					<Button
						onClick={() => {
							followed ? onUnfollow(id) : onFollow(id)
						}}
						disabled={isFollowingProgress.some((item) => item === id)}
						color={buttonColor}
						text={buttonText}
					/>
				)}
			</div>
		</div>
	)
}

export default User
