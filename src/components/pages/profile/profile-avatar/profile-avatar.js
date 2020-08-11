import React, { useState } from 'react';
import './profile-avatar.scss';
import defaultAvatar from '../../../../img/avatar.png';

const ProfileAvatar = ({ photo, updateUserPhoto }) => {
	const [editMode, setEditMode] = useState(false);

	const onAvatarDoubleClick = () => {
		setEditMode(!editMode);
	};

	const onPhotosSelect = (e) => {
		if (e.target.files.length) {
			updateUserPhoto(e.target.files[0]);
		}
	};

	return (
		<div className="avatar-wrapper">
			<img
				onDoubleClick={onAvatarDoubleClick}
				className="avatar"
				src={photo || defaultAvatar}
				alt="avatar"
			/>
			{editMode && (
				<label className="select-new-avatar">
					<input type="file" onChange={onPhotosSelect} />
					Select New Photo
				</label>
			)}
		</div>
	);
};

export default ProfileAvatar;
