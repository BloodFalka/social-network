import React, { FC } from 'react'
import './profile.scss'
import ProfileHeader from './profile-header/profile-header'
import MyPosts from './my-posts/my-posts'
import { UserDataType, PostsType } from '../../../types/types'
import Button from '../../common/button/button'

type PropsType = {
	userData: UserDataType|null,
	posts: Array<PostsType>,
	status: string | null,
	isMyPage: boolean

	onLogoutClick: () => void,
	updateUserStatus: (status: string | null) => void,
	updateUserPhoto: (photo: File) => void,
	updateUserData: (userData: UserDataType) => void,
	addLike: (postId: number|string) => void,
	removeLike: (postId: number|string) => void,
	removePost: (postId: number|string) => void,
	editPost: (postId: number|string, text: string) => void,
	startDialog: (userId: number|null) => void,
}

const Profile: FC<PropsType> = (props) => {
	return (
		<div className="profile">
			<ProfileHeader
				isMyPage={props.isMyPage}
				userData={props.userData}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				updateUserPhoto={props.updateUserPhoto}
				updateUserData={props.updateUserData}
				startDialog={props.startDialog}
			/>
			{props.isMyPage &&
			<MyPosts
			isMyPage={props.isMyPage}
				posts={props.posts}
				addLike={props.addLike}
				removeLike={props.removeLike}
				removePost={props.removePost}
				editPost={props.editPost}
			/>}
			{props.isMyPage &&<Button text="Logut" color="#f92b66" disabled={false} onClick={props.onLogoutClick} />}
		</div>
	)
}

export default Profile
