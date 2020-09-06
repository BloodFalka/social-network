import React, { FC, useState, useEffect } from 'react'
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

type OwnPropsType = RouteComponentProps<{
	userId: string,
}>

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType

const ProfileContainer: FC<PropsType> = (props) => {
	const [redirect, setRedirect] = useState(false)

	const refreshProfile = () => {
		let userId: number | null = props.match.params.userId ? +props.match.params.userId : props.currentUserId

		if (!userId) {
			setRedirect(true)
		} else {
			props.getUserProfile(userId, true)
			props.getUserStatus(userId)
		}
	}

	useEffect(() => {
		refreshProfile()
		// eslint-disable-next-line
	}, [props.match.params.userId])

	const onLogoutClick = () => {
		props.authLogout()
	}

	const isMyPage =
		props.currentUserId === +props.match.params.userId || !props.match.params.userId ? true : false

	return redirect || !props.isAuth ? (
		<Redirect to="/login" />
	) : props.isLoading ? (
		<Spinner />
	) : (
		<Profile
			onLogoutClick={onLogoutClick}
			posts={props.posts}
			userData={props.userData}
			status={props.status}
			updateUserStatus={props.updateUserStatus}
			updateUserPhoto={props.updateUserPhoto}
			updateUserData={props.updateUserData}
			isMyPage={isMyPage}
			addLike={props.addLike}
			removeLike={props.removeLike}
			removePost={props.removePost}
			editPost={props.editPost}
		/>
	)
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

export default compose<FC>(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps,
		mapDispatchToProps
	),
	withRouter
)(ProfileContainer)
