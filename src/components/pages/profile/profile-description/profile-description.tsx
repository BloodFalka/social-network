import React, { FC } from 'react'
import './profile-description.scss'
import ProfileStatus from './profile-status'
import { useState } from 'react'
import Button from '../../../common/button/button'
import { UserDataType } from '../../../../types/types'
import { ProfileName } from './ProfileName'
import { ProfileDescriptionFormValuesType, ReduxProfileDescriptionForm } from './ProfileDescriptionForm'
import { SocialsLinks } from './socials/SocialLinks'


type ProfileDescriptionPropsType = {
	userData: UserDataType|null
	status: string|null
	isMyPage: boolean
	updateUserStatus: (status: string | null) => void,
	updateUserData: (userData: UserDataType) => void,
}

const ProfileDescription:FC<ProfileDescriptionPropsType> = ({ updateUserData, userData, status, updateUserStatus, isMyPage }) => {
	const [editMode, setEditMode] = useState(false)

	const onClickEditDescription = () => {
		setEditMode(true)
	}

	const onSubmit = (userData:ProfileDescriptionFormValuesType) => {
		updateUserData(userData)
		setEditMode(false)
	}

	return (
		<div className="description">
		{!editMode&&userData ? (
			<div>
				<ProfileName name={userData.fullName} />
				<ProfileStatus isMyPage={isMyPage} status={status||'No status'} updateUserStatus={updateUserStatus} />
				{userData.lookingForAJob&&userData.lookingForAJobDescription?
					<>
						<div> My skills:</div>
						<pre className="skills">{userData.lookingForAJobDescription}</pre>
					</>:
					null
				}
				{userData.aboutMe&&<pre className="about-me">{userData.aboutMe}</pre>}
				<SocialsLinks contacts={userData.contacts} />
				{isMyPage && <Button text={'Edit Description'} onClick={onClickEditDescription} />}
			</div>
		) : (
			userData&&<ReduxProfileDescriptionForm contacts={userData.contacts} onSubmit={onSubmit} initialValues={userData} />
		)}
	</div>
	)
}

export default ProfileDescription