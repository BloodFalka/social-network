import React, { FC } from 'react'
import './new-message.scss'
import Button from '../../../common/button/button'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Textarea, ExtractStringKeys } from '../../../common/forms-controls/forms-controls'
import { maxLengthCreator, minLengthCreator, required } from '../../../../utils/validator'

const maxLength500 = maxLengthCreator(500)
const minLength2 = minLengthCreator(2)

type NewMessageFormValuesKeys = ExtractStringKeys<NewMessageValuesType>

const NewMessageForm: FC<InjectedFormProps<NewMessageValuesType>> = (props) => {
	return (
		<form className="new-message" onSubmit={props.handleSubmit}>
			{createField<NewMessageFormValuesKeys>(
				[maxLength500, minLength2, required],
				'Enter your message',
				'body',
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
	body: string,
}

type NewMessageProps = {
	userId: number,
	sendMessage: (userId: number, body: string) => void,
	reset: (form: string) => void,
}

const NewMessage: FC<NewMessageProps> = (props) => {
	const onSubmit = (formData: NewMessageValuesType) => {
		if (formData.body) {
			props.sendMessage(props.userId, formData.body)
			props.reset('new-message')
		}
	}

	return <ReduxNewMessageForm onSubmit={onSubmit} />
}

export default NewMessage
