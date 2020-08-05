import React from 'react';
import './profile.scss';
import ProfileHeader from './profile-header';
import MyPosts from './my-posts';

const Profile = (props) => {
	return (
		<div className="profile">
			<ProfileHeader userData={props.userData} />
			<MyPosts posts={props.posts} />
		</div>
	);
};

export default Profile;
