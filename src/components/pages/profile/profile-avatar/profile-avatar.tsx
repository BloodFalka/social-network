import React, { useState, FC } from 'react'
import './profile-avatar.scss'
import { FaTelegramPlane } from "react-icons/fa";
import defaultAvatar from '../../../../img/avatar.png'
import Button from '../../../common/button/button'
import { Redirect } from 'react-router-dom';
import FollowButton from './FollowButton';


type PropsType = {
	photo?: string|null
	isMyPage: boolean
	userId: number|null
	updateUserPhoto: (file: File) => void,
	startDialog: (userId: number|null) => void,
}

const ProfileAvatar: FC<PropsType> = ({ photo, updateUserPhoto, isMyPage, startDialog, userId }) => {
	const [editMode, setEditMode] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const onAvatarDoubleClick = () => {
		isMyPage&&setEditMode(!editMode)
	}

	const onPhotosSelect = (e:  React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files.length) {
			updateUserPhoto(e.currentTarget.files[0])
		}
	}

	const onStartDialogClick = () => {
		startDialog(userId)
		setRedirect(true)
	}

	return (redirect? <Redirect to={`/dialogs/${userId}`}/>:
		<div className="avatar-wrapper">
			<img onDoubleClick={onAvatarDoubleClick} className="avatar" src={photo || defaultAvatar} alt="avatar" />
			{editMode && (
				<label className="select-new-avatar">
					<input type="file" onChange={onPhotosSelect} />
					Select New Photo
				</label>
			)}
			{!isMyPage&&<Button onClick={onStartDialogClick} text={'Start Chatting'}><FaTelegramPlane/></Button>}
			{!isMyPage&&<FollowButton userId={userId}/>}
		</div>
	)
}

export default React.memo(ProfileAvatar)
