import React, { useState } from 'react'
import './my-post.scss'
import Like from '../../../../common/like/like'
import { required, maxLengthCreator, minLengthCreator } from '../../../../../utils/validator'
import { createField, Textarea, ExtractStringKeys } from '../../../../common/forms-controls/forms-controls'
import { reduxForm, InjectedFormProps } from 'redux-form'
import Button from '../../../../common/button/button'

const maxLength1000 = maxLengthCreator(1000),
	minLength5 = minLengthCreator(5)

type MyPostValuesType = {
	message: string,
}

type MyPostFormValuesKeys =  ExtractStringKeys< MyPostValuesType>

const MyPostForm: React.FC<InjectedFormProps<MyPostValuesType>> = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit} className="my-post-form">
			{createField<MyPostFormValuesKeys>([required, maxLength1000, minLength5], undefined, 'message', Textarea, {
				className: 'textarea post-body',
			})}
			<Button text={'Save'} color={'#001935'} />
		</form>
	)
}

const ReduxLoginForm = reduxForm<MyPostValuesType>({ form: 'edit-post' })(MyPostForm)

type MyPostPropsType = {
	message: string
	images: Array<string>|null
	id: number|string
	isMyPage: boolean
	removePost: (postId: number|string) => void
	editPost: (postId: number|string, message: string) => void
	addLike: (postId:number|string) => void
	removeLike:  (postId:number|string) => void
	likesCount: number
	liked: boolean
}

const MyPost: React.FC<MyPostPropsType> = (props) => {
	const [editMode, setEditMode] = useState(false)
	const { message, images } = props
	const onRemoveClick = () => {
		props.removePost(props.id)
	}
	const onClickEdit = () => {
		setEditMode(true)
	}
	const onSubmit = ({message}:MyPostValuesType) => {
		setEditMode(false)
		props.editPost(props.id, message)
	}

	const img = images
		? images.map((item, i) => {
				return <img key={i} className="post-img" src={item} alt="post-foto" />
		  })
		: null
	return (
		<div className="my-post">
			{props.isMyPage && (
				<div className="edit-menu">
					<svg viewBox="0 0 17.6 17.6" width="21" height="21" fill="#001935" onClick={onClickEdit}>
						<path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path>
					</svg>
					<svg viewBox="0 0 14 17" width="21" height="21" fill="#f92b66" onClick={onRemoveClick}>
						<path d="M12 5v9c.1.7-.3 1-1 1H3c-.5 0-.9-.3-1-1V5c0-.6-.4-1-1-1-.5 0-1 .4-1 1v9.5C0 16.1 1.4 17 3 17h8c1.8 0 3-.8 3-2.5V5c0-.6-.5-1-1-1-.6 0-1 .5-1 1z"></path>
						<path d="M4 12s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm4 0s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm5-10c.5 0 1-.4 1-1 0-.5-.4-.9-1-1H1C.5.1 0 .5 0 1c0 .6.6 1 1.1 1H13z"></path>
					</svg>
				</div>
			)}

			{!editMode ? (
				<div className="post-text">{message}</div>
			) : (
				<ReduxLoginForm onSubmit={onSubmit} initialValues={{message}} />
			)}
			{images && img}
			<Like
				addLike={props.addLike}
				removeLike={props.removeLike}
				likesCount={props.likesCount}
				liked={props.liked}
				itemId={props.id}
				key={props.id}
			/>
		</div>
	)
}

export default MyPost
