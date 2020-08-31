import React, { FC } from 'react'
import './dialogs.scss'
import Messages from './messages/messages'
import Dialog from './dialog/dialog'
import NewMessageContainer from './newMessage/new-message'
import { DialogsType, MessagesType } from '../../../types/types'

type PropsType = {
	dialogs: Array<DialogsType>,
	messages: Array<MessagesType>,
	addMessage: (text: string, id: number | string) => void,
	reset: (form: string) => void,
}

const Dialogs: FC<PropsType> = ({ dialogs, messages, addMessage, reset }) => {
	const dialogsTemplate = dialogs.map((item) => {
		return <Dialog key={item.id} id={item.id} name={item.name} avatar={item.avatar} />
	})
	return (
		<div className="dialogs">
			<div className="dialogs-items">{dialogsTemplate}</div>
			<Messages messages={messages} />
			<NewMessageContainer addMessage={addMessage} reset={reset} />
		</div>
	)
}

export default Dialogs
