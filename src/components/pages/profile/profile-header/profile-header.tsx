import React, { FC } from 'react'
import './profile-header.scss'
import ProfileAvatar from '../profile-avatar'
import ProfileDescription from '../profile-description'
import Spinner from '../../../common/spinner/spinner'
import { userDataType, userPhotoFileType } from '../../../../types/types'

type PropsType = {
	userData: userDataType
	status: string|null
	updateUserData: (userData:userDataType)=>void
	updateUserPhoto: (photo: userPhotoFileType)=>void
	updateUserStatus: (status:string|null)=>void
	authLogout: ()=>void
}

const ProfileHeader:FC<PropsType> = (props) => {
	debugger
	if (!props.userData) {
		return <Spinner />
	}
	return (
		<div className="header">
			<ProfileAvatar photo={props.userData.photos.large} updateUserPhoto={props.updateUserPhoto} />
			<ProfileDescription {...props} />
		</div>
	)
}

export default ProfileHeader
