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
import { addLike, removeLike, removePost, editPost } from '../../../redux/reducers/posts-reducer';
import { authLogout } from '../../../redux/reducers/auth-reducer';
import Spinner from '../../common/spinner/spinner';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Button from '../../common/button';
import { userDataType, postsType, userPhotoFileType } from '../../../types/types';
import { AppStateType } from '../../../redux/store';


type PropsType = {
	userData: userDataType
	posts: postsType
	status: string|null
	isLoading: boolean
	isAuth: boolean
	currentUserId: number
	match:any

	setUserData: (userData:userDataType) => void
	getUserProfile: (userId: number, isAuth: boolean) => void
	getUserStatus: (userId: number) => void
	updateUserStatus: (status:string|null) => void
	updateUserPhoto: (photo: userPhotoFileType) => void
	authLogout: () => void
	updateUserData: (userData:userDataType) => void
	addLike: (postId: number) => void
	removeLike: (postId: number) => void
	removePost: (postId: number) => void
	editPost: (postId: number, text: string) => void

}

class ProfileContainer extends Component<PropsType> {
	state = {
		redirect: false,
	};

	refreshProfile = () => {
		let userId:number|null = this.props.match.params.userId ? this.props.match.params.userId : this.props.currentUserId;

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

	componentDidUpdate(prevProps:PropsType) {
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
				<Profile
					authLogout={this.props.authLogout}
					posts={this.props.posts}
					userData={this.props.userData}
					status={this.props.status}
					updateUserStatus={this.props.updateUserStatus}
					updateUserPhoto={this.props.updateUserPhoto}
					updateUserData={this.props.updateUserData}
					userId={this.props.match.params.userId || this.props.currentUserId}
					addLike={this.props.addLike}
					removeLike={this.props.removeLike}
					removePost={this.props.removePost}
					editPost={this.props.editPost}
				/>
				{!this.props.match.params.userId && <Button text="Logut" color="#f92b66" onClick={this.onLogoutClick} />}
			</div>
		);
	}
}

const mapStateToProps = (state:AppStateType) => ({
	userData: state.profilePage.userData,
	posts: state.postsPage.posts,
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
	addLike,
	removeLike,
	removePost,
	editPost,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileContainer);
