import React, { FC } from 'react'
import './new-message.scss'
import Button from '../../../common/button/button'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Textarea, ExtractStringKeys } from '../../../common/forms-controls/forms-controls'
import { maxLengthCreator, minLengthCreator, required } from '../../../../utils/validator'
import nextId from 'react-id-generator'

const maxLength500 = maxLengthCreator(500)
const minLength2 = minLengthCreator(2)

type NewMessageFormValuesKeys = ExtractStringKeys<NewMessageValuesType>

const NewMessageForm: FC<InjectedFormProps<NewMessageValuesType>> = (props) => {
	return (
		<form className="new-message" onSubmit={props.handleSubmit}>
			{createField<NewMessageFormValuesKeys>(
				[maxLength500, minLength2, required],
				'Enter your message',
				'messageText',
				Textarea,
				{
					className: 'text-field',
				}
			)}
			<Button text="Send" />
		</form>
	)
}

const ReduxNewMessageForm = reduxForm<NewMessageValuesType>({ form: 'new-message' })(NewMessageForm)

type NewMessageValuesType = {
	messageText: string,
}

type NewMessageProps = {
	addMessage: (text: string, id: number | string) => void,
	reset: (form: string) => void,
}

const NewMessage: FC<NewMessageProps> = (props) => {
	debugger
	const onSubmit = (formData: NewMessageValuesType) => {
		if (formData.messageText) {
			const id = nextId()
			props.addMessage(formData.messageText, id)
			props.reset('new-message')
		}
	}
	return <ReduxNewMessageForm onSubmit={onSubmit} />
}

export default NewMessage
