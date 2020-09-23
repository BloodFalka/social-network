import React, { FC, useEffect } from 'react'
import './dialogs.scss'
import Messages from './messages/messages'
import Dialog from './dialog/dialog'
import NewMessageContainer from './newMessage/new-message'
import { DialogsType, MessagesType } from '../../../types/types'
import { RouteComponentProps } from 'react-router-dom'
import Spinner from '../../common/spinner/spinner'
import styled from 'styled-components'

type PropsType = {
	dialogs: Array<DialogsType>,
	messages: Array<MessagesType>,
	messageFriendAvatar: string | null,
	currentUserAvatar: string | null,
	currentUserId: number | null,
	isLoadingMessages: boolean,
	isLoadingDialogs: boolean,
	getDialogs: () => void,
	getMessages: (userId: number | null) => void,
	setMessageFriendAvatar: (avatar: string | null) => void,
	getCurrentUserAvatar: () => void,
	sendMessage: (userId: number, body: string) => void,
	reset: (form: string) => void,
}

type Props = PropsType &
	RouteComponentProps<{
		userId: string,
	}>

const Dialogs: FC<Props> = ({
	dialogs,
	messages,
	messageFriendAvatar,
	currentUserAvatar,
	currentUserId,
	isLoadingMessages,
	isLoadingDialogs,
	getDialogs,
	getMessages,
	setMessageFriendAvatar,
	getCurrentUserAvatar,
	sendMessage,
	reset,
	match,
}) => {
	useEffect(() => {
		getDialogs()
		getCurrentUserAvatar()
		// eslint-disable-next-line
	}, [])

	const userId = +match.params.userId

	const dialogsTemplate = dialogs.map((item) => {
		return (
			<Dialog
				setMessageFriendAvatar={setMessageFriendAvatar}
				key={item.id}
				id={item.id}
				currentDialogId={userId}
				name={item.userName}
				avatar={item.photos.small}
				newMessagesCount={item.newMessagesCount}
			/>
		)
	})

	return dialogs.length ? (
		<div className="dialogs">
			{isLoadingDialogs ? <Spinner /> : <div className="dialogs-items">{dialogsTemplate}</div>}
			{+match.params.userId ? (
				<Messages
					messageFriendAvatar={messageFriendAvatar}
					currentUserAvatar={currentUserAvatar}
					currentUserId={currentUserId}
					messages={messages}
					getMessages={getMessages}
					userId={userId}
					isLoading={isLoadingMessages}
				/>
			) : null}
			{userId ? (
				<NewMessageContainer userId={userId} sendMessage={sendMessage} reset={reset} />
			) : (
				<div className="choose-user">Please Choose User</div>
			)}
		</div>
	) : (
		<NoDialogs>You haven't dialogs, Start chatting with someone</NoDialogs>
	)
}

const NoDialogs = styled.div`
	height: 100%;
	font-family: monospace;
	text-shadow: 3px 2px 2px #f92b66, -2px -2px 2px #17a2b8;
	font-size: 40px;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
`

export default Dialogs
