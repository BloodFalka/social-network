import React, { useState, useEffect } from 'react';
import Button from '../../../common/button';
import './profile-description.scss';

const ProfileStatus = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const onStatusDoubleClick = () => {
		setEditMode(true);
	};

	const onEditClick = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};

	return (
		<div className="status">
			{!editMode ? (
				<div className="status-text" onDoubleClick={onStatusDoubleClick}>
					{status || 'No Status'}
				</div>
			) : (
				<div className="status-edit">
					<input onChange={onStatusChange} className="input" value={status} />
					<Button onClick={onEditClick} text="Edit" />
				</div>
			)}
		</div>
	);
};

export default ProfileStatus;
