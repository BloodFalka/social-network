import React, { FC, useState } from 'react'
import './new-post.scss'
import Button from '../../common/button/button'
import { Redirect } from 'react-router'
import { reduxForm, InjectedFormProps } from 'redux-form'
import nextId from 'react-id-generator'
import { maxLengthCreator, minLengthCreator, required } from '../../../utils/validator'
import { createField, Textarea, ExtractStringKeys } from '../../common/forms-controls/forms-controls'

const maxLength500 = maxLengthCreator(500)
const minLength2 = minLengthCreator(2)

type NewPostFormValuesKeys = ExtractStringKeys<NewPostValuesType>

type NewPostValuesType = {
	postText: string,
}

const NewPostForm: FC<InjectedFormProps<NewPostValuesType>> = (props) => {
	return (
		<form className="new-post" onSubmit={props.handleSubmit}>
			{createField<NewPostFormValuesKeys>(
				[maxLength500, minLength2, required],
				'Enter your post text',
				'postText',
				Textarea,
				{
					className: 'text-field',
				}
			)}
			<Button text="Post" />
		</form>
	)
}

const ReduxNewPostForm = reduxForm<NewPostValuesType>({ form: 'new-post' })(NewPostForm)

type NewPostPropsType = {
	addPost: (text: string, id: number | string) => void,
}

const NewPost: FC<NewPostPropsType> = (props) => {
	const [redirect, setRedirect] = useState(false)

	const onSubmit = (formData: NewPostValuesType) => {
		console.log(formData)

		if (formData.postText) {
			const id = nextId()
			props.addPost(formData.postText, id)
			setRedirect(true)
		}
	}

	return redirect ? <Redirect to="/profile" /> : <ReduxNewPostForm onSubmit={onSubmit} />
}

export default NewPost
