import React from 'react';
import './profile.scss';
import ProfileHeader from './profile-header';
import MyPosts from './my-posts';

const Profile = (props) => {
	return (
		<div className="profile">
			<ProfileHeader
				authLogout={props.authLogout}
				userData={props.userData}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				updateUserPhoto={props.updateUserPhoto}
				updateUserData={props.updateUserData}
			/>
			<MyPosts posts={props.posts} />
		</div>
	);
};

export default Profile;
