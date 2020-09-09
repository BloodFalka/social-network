import React, { FC } from 'react'
import './friends.scss'
import Friend from './friend/friend'
import { FriendType } from '../../../types/types'

type PropsType = {
	friends: Array<FriendType>,
}

const Friends: FC<PropsType> = ({ friends }) => {
	const friendsTemplate = friends.map((item) => {
		return (
			<Friend key={item.id} name={item.name} userId={item.id} avatar={item.avatar} status={item.status} />
		)
	})

	return friends.length ? (
		<div className="friends">{friendsTemplate}</div>
	) : (
		<div className="no-friends">You not have friends</div>
	)
}

export default Friends
