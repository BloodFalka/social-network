import React from 'react';
import './profile-header.scss';
import ProfileAvatar from '../profile-avatar';
import ProfileDescription from '../profile-description';
import { connect } from 'react-redux';

const ProfileHeader = (props) => {
	return (
		<div className="header">
			<ProfileAvatar />
			<ProfileDescription />
		</div>
	);
};

const mapDispatchToProps = () => {};

const mapStateToProps = (state) => {};

export default connect()(ProfileHeader);
