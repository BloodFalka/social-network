import React, { Component } from 'react'
import './profile.scss'
import Profile from './profile'
import { connect } from 'react-redux'
import {
	actions as ProfileActions,
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	updateUserPhoto,
	updateUserData,
} from '../../../redux/reducers/profile-reducer'
import { actions as PostActions } from '../../../redux/reducers/posts-reducer'
import { authLogout } from '../../../redux/reducers/auth-reducer'
import Spinner from '../../common/spinner/spinner'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { compose } from 'redux'
import { UserDataType, PostsType } from '../../../types/types'
import { AppStateType } from '../../../redux/store'
import { selectPosts } from '../../../redux/selectors/posts-selector'
import { selectUserData, selectUserStatus, selectIsLoading } from '../../../redux/selectors/profile-selector'
import { selectIsAuth, selectUserId } from '../../../redux/selectors/auth-selector'

const { addLike, removeLike, removePost, editPost } = PostActions
const { setUserData } = ProfileActions

type MapDispatchPropsType = {
	setUserData: (userData: UserDataType) => void,
	getUserProfile: (userId: number, isAuth: boolean) => void,
	getUserStatus: (userId: number) => void,
	updateUserStatus: (status: string | null) => void,
	updateUserPhoto: (photo: File) => void,
	authLogout: () => void,
	updateUserData: (userData: UserDataType) => void,
	addLike: (postId: number | string) => void,
	removeLike: (postId: number | string) => void,
	removePost: (postId: number | string) => void,
	editPost: (postId: number | string, text: string) => void,
}

type MapStatePropsType = {
	userData: UserDataType | null,
	posts: Array<PostsType>,
	status: string | null,
	isLoading: boolean,
	isAuth: boolean,
	currentUserId: number | null,
}

type MatchParamsType = {
	userId: string,
}
type OwnPropsType = RouteComponentProps<MatchParamsType>

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType

class ProfileContainer extends Component<PropsType> {
	state = {
		redirect: false,
	}

	refreshProfile = () => {
		let userId: number | null = this.props.match.params.userId
			? +this.props.match.params.userId
			: this.props.currentUserId

		if (!userId) {
			this.setState({
				redirect: true,
			})
		} else {
			this.props.getUserProfile(userId, true)
			this.props.getUserStatus(userId)
		}
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.refreshProfile()
		}
	}

	onLogoutClick = () => {
		this.props.authLogout()
		this.setState({
			redirect: true,
		})
	}

	render() {
		const isMyPage =
			this.props.currentUserId === +this.props.match.params.userId || !this.props.match.params.userId
				? true
				: false
		return this.state.redirect ? (
			<Redirect to="/login" />
		) : this.props.isLoading ? (
			<Spinner />
		) : (
			<Profile
				onLogoutClick={this.onLogoutClick}
				posts={this.props.posts}
				userData={this.props.userData}
				status={this.props.status}
				updateUserStatus={this.props.updateUserStatus}
				updateUserPhoto={this.props.updateUserPhoto}
				updateUserData={this.props.updateUserData}
				isMyPage={isMyPage}
				addLike={this.props.addLike}
				removeLike={this.props.removeLike}
				removePost={this.props.removePost}
				editPost={this.props.editPost}
			/>
		)
	}
}

const mapStateToProps = (state: AppStateType) => ({
	userData: selectUserData(state),
	posts: selectPosts(state),
	status: selectUserStatus(state),
	isLoading: selectIsLoading(state),
	isAuth: selectIsAuth(state),
	currentUserId: selectUserId(state),
})

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
}

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps,
		mapDispatchToProps
	),
	withRouter
)(ProfileContainer)
