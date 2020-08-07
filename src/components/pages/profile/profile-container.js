import React, { Component } from 'react';
import './profile.scss';
import Profile from './profile';
import { connect } from 'react-redux';
import {
	setUserData,
	getUserProfile,
} from '../../../redux/reducers/profile-reducer';
import Spinner from '../../common/spinner/spinner';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/with-auth-redirect';
import { compose } from 'redux';

class ProfileContainer extends Component {
	componentDidMount() {
		this.props.getUserProfile(
			this.props.match.params.userId,
			this.props.currentUserId,
			this.props.isAuth
		);
	}

	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : (
			<Profile posts={this.props.posts} userData={this.props.userData} />
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

const mapDispatchToProps = { setUserData, getUserProfile };

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
