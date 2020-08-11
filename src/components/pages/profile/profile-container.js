import React, { Component } from 'react';
import './profile.scss';
import Profile from './profile';
import { connect } from 'react-redux';
import {
	setUserData,
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	updateUserPhoto,
	updateUserData,
} from '../../../redux/reducers/profile-reducer';
import { authLogout } from '../../../redux/reducers/auth-reducer';
import Spinner from '../../common/spinner/spinner';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Button from '../../common/button';

class ProfileContainer extends Component {
	state = {
		redirect: false,
	};

	refreshProfile = () => {
		let userId = this.props.match.params.userId ? this.props.match.params.userId : this.props.currentUserId;

		if (!userId) {
			this.setState({
				redirect: true,
			});
		} else {
			this.props.getUserProfile(userId, true);
			this.props.getUserStatus(userId);
		}
	};

	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.refreshProfile();
		}
	}

	onLogoutClick = () => {
		this.props.authLogout();
		this.setState({
			redirect: true,
		});
	};

	render() {
		return this.state.redirect ? (
			<Redirect to="/login" />
		) : this.props.isLoading ? (
			<Spinner />
		) : (
			<div className="profile-temple-wrapper">
				{!this.props.match.params.userId && <Button text="Logut" color="red" onClick={this.onLogoutClick} />}
				<Profile
					authLogout={this.props.authLogout}
					posts={this.props.posts}
					userData={this.props.userData}
					status={this.props.status}
					updateUserStatus={this.props.updateUserStatus}
					updateUserPhoto={this.props.updateUserPhoto}
					updateUserData={this.props.updateUserData}
					userId={this.props.match.params.userId || this.props.currentUserId}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.profilePage.userData,
	posts: state.newPostPage.posts,
	status: state.profilePage.status,
	isLoading: state.profilePage.isLoading,
	isAuth: state.auth.isAuth,
	currentUserId: state.auth.data.userId,
});

const mapDispatchToProps = {
	setUserData,
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	updateUserPhoto,
	authLogout,
	updateUserData,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileContainer);
