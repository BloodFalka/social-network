import React, { FC } from 'react'
import './dialogs.scss'
import { connect } from 'react-redux'
import Dialogs from './dialogs'
import withAuthRedirect from '../../hoc/with-auth-redirect'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/store'
import { DialogsType, MessagesType } from '../../../types/types'
import { selectDialogs, selectMessages } from '../../../redux/selectors/message-selector'
import { actions as messageActions } from '../../../redux/reducers/message-reducer'
import { reset } from 'redux-form'

const { addMessage } = messageActions

type MapStatePropsType = {
	dialogs: Array<DialogsType>,
	messages: Array<MessagesType>,
}

type MapDispatchPropsType = {
	addMessage: (text: string, id: number | string) => void,
	reset: (form: string) => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const DialogsContainer: FC<PropsType> = (props) => {
	return <Dialogs {...props} />
}
const mapStateToProps = (state: AppStateType) => ({
	dialogs: selectDialogs(state),
	messages: selectMessages(state),
})

const mapDispatchToProps = {
	addMessage,
	reset,
}

export default compose<FC>(
	connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(DialogsContainer)
