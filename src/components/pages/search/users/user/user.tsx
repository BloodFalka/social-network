import React, { FC } from 'react'
import Button from '../../../../common/button/button'
import './user.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFollow, setUnfollow } from '../../../../../redux/reducers/users-reducer'

type PropsType = {
	name: string
	status: string
	followed: boolean
	id: number
	avatar: string|null
	isFollowingProgress: Array<number>
	isAuth: boolean
	currentUserId: number|null
}

const User: FC<PropsType> = ({
	name,
	status,
	followed,
	id,
	avatar,
	isFollowingProgress,
	isAuth,
	currentUserId
}) => {
	const buttonText = followed ? 'UNFOLLOW' : 'FOLLOW'
	const buttonColor = followed ? '#f92b66' : '#00b8ff'
	const avatarTemplate = {
		backgroundImage: `url(${
			avatar || 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
		})`,
	}

	const dispatch = useDispatch();

	const onFollow = (id: number) => {
		dispatch(setFollow(id))
	}

	const onUnfollow = (id: number) => {
		dispatch(setUnfollow(id))
	}

	return (
		<div className="user">
			<NavLink to={`profile/${id}`} className="avatar-nav">
				<div className="avatar" style={avatarTemplate}></div>
			</NavLink>
			<div className="description">
				<div className="name">{name}</div>
				<div className="status">{status}</div>
				{(isAuth && currentUserId !== id)?(
					<Button
						onClick={() => {
							followed ? onUnfollow(id) : onFollow(id)
						}}
						disabled={isFollowingProgress.some((item) => item === id)}
						color={buttonColor}
						text={buttonText}
					/>
				): <Button
						disabled={true}
						text={'YOUR PAGE'}/>
				}
			</div>
		</div>
	)
}

export default User
