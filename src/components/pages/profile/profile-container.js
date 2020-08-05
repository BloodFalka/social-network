import React, { Component } from 'react';
import './profile.scss';
import Profile from './profile';
import { connect } from 'react-redux';
import {
	setUserData,
	toggleLoading,
} from '../../../redux/reducers/profile-reducer';
import Spinner from '../../common/spinner/spinner';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { profileAPI } from '../../../api';

class ProfileContainer extends Component {
	componentDidMount() {
		this.props.toggleLoading(true);

		let userId = this.props.match.params.userId
			? this.props.match.params.userId
			: this.props.currentUserId;

		if (!this.props.isAuth) {
			return;
		}

		profileAPI.getProfile(userId).then((data) => {
			this.props.toggleLoading(false);
			this.props.setUserData(data);
		});
	}

	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : !this.props.isAuth ? (
			<Redirect push to="/login" />
		) : (
			<Profile {...this.props} />
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.profilePage.userData,
	posts: state.newPostPage.posts,
	isLoading: state.profilePage.isLoading,
	isAuth: state.auth.isAuth,
	currentUserId: state.auth.data.userId,
});

const mapDispatchToProps = { setUserData, toggleLoading };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProfileContainer));
