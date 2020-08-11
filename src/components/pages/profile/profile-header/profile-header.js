import React from 'react';
import './profile-header.scss';
import ProfileAvatar from '../profile-avatar';
import ProfileDescription from '../profile-description';
import Spinner from '../../../common/spinner/spinner';

const ProfileHeader = (props) => {
	if (!props.userData) {
		return <Spinner />;
	}
	return (
		<div className="header">
			<ProfileAvatar
				photo={props.userData.photos.large}
				updateUserPhoto={props.updateUserPhoto}
			/>
			<ProfileDescription {...props} />
		</div>
	);
};

export default ProfileHeader;
