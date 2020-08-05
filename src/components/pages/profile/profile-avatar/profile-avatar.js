import React from 'react';
import './profile-avatar.scss';
import defaultAvatar from '../../../../img/avatar.png';

const ProfileAvatar = (props) => {
	return (
		<img
			className="avatar"
			src={props.photo ? props.photo : defaultAvatar}
			alt="avatar"
		/>
	);
};

export default ProfileAvatar;
