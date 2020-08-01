import React from 'react';
import './profile-avatar.scss';
import { connect } from 'react-redux';

const ProfileAvatar = (props) => {
	return <img className="avatar" src={props.src} alt="avatar" />;
};

const mapStateToProps = (state) => {
	return {
		src: state.profilePage.data.avatar,
	};
};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
