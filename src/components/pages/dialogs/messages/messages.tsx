import React, { FC, useEffect, useRef } from 'react'
import './messages.scss'
import Message from './message/message'
import { MessagesType } from '../../../../types/types'
import Spinner from '../../../common/spinner/spinner'

type PropsType = {
	messages: Array<MessagesType>,
	userId: number | null,
	messageFriendAvatar: string | null,
	currentUserAvatar: string | null,
	currentUserId: number | null,
	isLoading: boolean,
	getMessages: (userId: number | null) => void,
}

const Messages: FC<PropsType> = ({
	messages,
	getMessages,
	userId,
	messageFriendAvatar,
	currentUserAvatar,
	currentUserId,
	isLoading,
}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		getMessages(userId)
		if (!isLoading && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		getMessages(userId)
		// eslint-disable-next-line
	}, [userId])

	useEffect(() => {
		if (!isLoading && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
		}
	}, [messages, isLoading])

	const messagesTemplate = messages.map((item) => {
		return (
			<Message
				messageFriendAvatar={messageFriendAvatar}
				currentUserAvatar={currentUserAvatar}
				currentUserId={currentUserId}
				key={item.id}
				id={item.id}
				senderId={item.senderId}
				body={item.body}
				viewed={item.viewed}
			/>
		)
	})

	return isLoading ? (
		<Spinner />
	) : (
		<div className="messages">
			{messages.length ? (
				messagesTemplate
			) : (
				<div className="no-messages">You haven't messages with this user</div>
			)}
			<div className="messages-end" ref={messagesEndRef}></div>
		</div>
	)
}

export default Messages
