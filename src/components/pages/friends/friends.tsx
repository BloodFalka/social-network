import React, { FC } from 'react'
import './friends.scss'
import Friend from './friend/friend'
import { FriendType } from '../../../types/types'

type PropsType = {
	friends: Array<FriendType>,
}

const Friends: FC<PropsType> = ({ friends }) => {
	const friendsTemplate = friends.map((item) => {
		return <Friend key={item.id} name={item.name} avatar={item.avatar} status={item.status} />
	})

	return <div className="friends">{friendsTemplate}</div>
}

export default Friends
