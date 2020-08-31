import React, { useState, FC } from 'react'
import './profile-avatar.scss'
import defaultAvatar from '../../../../img/avatar.png'


type PropsType = {
	photo?: string|null
	isMyPage: boolean
	updateUserPhoto: (file: File) => void,
}

const ProfileAvatar: FC<PropsType> = ({ photo, updateUserPhoto, isMyPage }) => {
	const [editMode, setEditMode] = useState<boolean>(false)

	const onAvatarDoubleClick = () => {
		isMyPage&&setEditMode(!editMode)
	}

	const onPhotosSelect = (e:  React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files.length) {
			updateUserPhoto(e.currentTarget.files[0])
		}
	}

	return (
		<div className="avatar-wrapper">
			<img onDoubleClick={onAvatarDoubleClick} className="avatar" src={photo || defaultAvatar} alt="avatar" />
			{editMode && (
				<label className="select-new-avatar">
					<input type="file" onChange={onPhotosSelect} />
					Select New Photo
				</label>
			)}
		</div>
	)
}

export default ProfileAvatar
