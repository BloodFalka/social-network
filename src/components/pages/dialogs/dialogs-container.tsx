import React, { FC } from 'react'
import './dialogs.scss'
import { connect } from 'react-redux'
import Dialogs from './dialogs'
import withAuthRedirect from '../../hoc/with-auth-redirect'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/store'
import { DialogsType, MessagesType } from '../../../types/types'
import {
	selectMessages,
	selectIsLoading as selectIsLoadingMessages,
	selectMessageFriendAvatar,
	selectCurrentUserAvatar,
} from '../../../redux/selectors/message-selector'
import {
	selectDialogs,
	selectIsLoading as selectIsLoadingDialogs,
} from '../../../redux/selectors/dialogs-selector'
import { actions as messageActions } from '../../../redux/reducers/messages-reducer'
import { getMessages, sendMessage, getCurrentUserAvatar } from '../../../redux/reducers/messages-reducer'
import { getDialogs } from '../../../redux/reducers/dialogs-reducer'
import { reset } from 'redux-form'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { selectUserId } from '../../../redux/selectors/auth-selector'

const { setMessageFriendAvatar } = messageActions

type MapStatePropsType = {
	dialogs: Array<DialogsType>,
	messages: Array<MessagesType>,
	messageFriendAvatar: string | null,
	currentUserAvatar: string | null,
	currentUserId: number | null,
	isLoadingMessages: boolean,
	isLoadingDialogs: boolean,
}

type MapDispatchPropsType = {
	getDialogs: () => void,
	getMessages: (userId: number | null) => void,
	setMessageFriendAvatar: (avatar: string | null) => void,
	getCurrentUserAvatar: () => void,
	sendMessage: (userId: number, body: string) => void,
	reset: (form: string) => void,
}

type OwnPropsType = RouteComponentProps<{
	userId: string,
}>

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DialogsContainer: FC<PropsType> = (props) => {
	debugger
	return <Dialogs {...props} />
}

const mapStateToProps = (state: AppStateType) => ({
	dialogs: selectDialogs(state),
	messages: selectMessages(state),
	messageFriendAvatar: selectMessageFriendAvatar(state),
	currentUserAvatar: selectCurrentUserAvatar(state),
	currentUserId: selectUserId(state),
	isLoadingMessages: selectIsLoadingMessages(state),
	isLoadingDialogs: selectIsLoadingDialogs(state),
})

const mapDispatchToProps = {
	getDialogs,
	getMessages,
	setMessageFriendAvatar,
	getCurrentUserAvatar,
	sendMessage,
	reset,
}

export default compose<FC>(
	connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
	withRouter,
	withAuthRedirect
)(DialogsContainer)
