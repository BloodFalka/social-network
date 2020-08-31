import React, { FC } from 'react'
import './messages.scss'
import Message from './message/message'
import { MessagesType } from '../../../../types/types'

type PropsType = {
	messages: Array<MessagesType>,
}

const Messages: FC<PropsType> = ({ messages }) => {
	const messagesTemplate = messages.map((item) => {
		return (
			<Message
				key={item.id}
				id={item.id}
				message={item.message}
				avatar={item.avatar || undefined}
				likesCount={item.likesCount}
				liked={item.liked}
			/>
		)
	})

	return <div className="messages">{messagesTemplate}</div>
}

export default Messages
