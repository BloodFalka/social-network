import React, { FC } from 'react'
import {FaCheck, FaCheckDouble} from 'react-icons/fa'
import classNames from 'classnames'
import './message.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
	body: string
	viewed: boolean
	senderId: number
	id: number|string
	messageFriendAvatar: string|null,
	currentUserAvatar: string|null,
	currentUserId: number | null,
}

const Message: FC<PropsType> = ({  body, viewed, id, messageFriendAvatar, currentUserAvatar, senderId, currentUserId } ) => {
	const isMyMessage = senderId === currentUserId
	const avatarTemplate = isMyMessage? currentUserAvatar:
						messageFriendAvatar? messageFriendAvatar:
						'https://image.flaticon.com/icons/png/512/206/206858.png'
	return (
		<div className={classNames('message', {my: isMyMessage})}>
			{/* TODO: add profile avatar if this is my page */}
			<NavLink to={`/profile/${senderId}`}><img src={avatarTemplate||''} alt="sendler-avatar" className="avatar" /></NavLink>
			<div className="message-text">
				{body}
				<div className="check-is-viewed">
					{isMyMessage&&(viewed? <FaCheckDouble/>: <FaCheck/>)}
				</div>
			</div>
		</div>
	)
}

export default Message
