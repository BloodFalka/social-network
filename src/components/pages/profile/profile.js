import React from 'react';
import './profile.scss';
import ProfileHeader from './profile-header';
import MyPosts from './my-posts';

const Profile = (props) => {
	return (
		<div className="profile">
			<ProfileHeader />
			<MyPosts />
		</div>
	);
};

export default Profile;
