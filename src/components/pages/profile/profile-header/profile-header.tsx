import React, { FC } from 'react'
import './profile-header.scss'
import ProfileAvatar from '../profile-avatar/profile-avatar'
import ProfileDescription from '../profile-description/profile-description'
import Spinner from '../../../common/spinner/spinner'
import { UserDataType } from '../../../../types/types'

type PropsType = {
	userData: UserDataType|null
	status: string|null
	isMyPage: boolean
	updateUserData: (userData:UserDataType)=>void
	updateUserPhoto: (photo: File)=>void
	updateUserStatus: (status:string|null)=>void
	startDialog: (userId: number|null) => void
}

const ProfileHeader:FC<PropsType> = (props) => {
	

	return !props.userData?  
		<Spinner /> :
		<div className="header">
			<ProfileAvatar userId={props.userData.userId} startDialog={props.startDialog} isMyPage={props.isMyPage} photo={props.userData.photos.large} updateUserPhoto={props.updateUserPhoto} />
			<ProfileDescription {...props} />
		</div>
}

export default ProfileHeader
