import React, { useEffect, FC } from 'react'
// @ts-ignore
import { SocialMediaIconsReact as SocialIcons } from 'social-media-icons-react'
import './profile-description.scss'
import ProfileStatus from './profile-status'
import { useState } from 'react'
import Button from '../../../common/button/button'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { required, maxLengthCreator, minLengthCreator } from '../../../../utils/validator'
import { Input, Textarea, createField, ExtractStringKeys } from '../../../common/forms-controls/forms-controls'
import { UserDataType } from '../../../../types/types'

const maxLength15 = maxLengthCreator(30)

const minLength5 = minLengthCreator(5)

type ProfileNamePropsType = {
	name: string
}

const ProfileName:FC<ProfileNamePropsType> = ({ name }) => {
	return <div className="name">{name}</div>
}

const ProfileDescriptionForm:FC<InjectedFormProps<ProfileDescriptionFormValuesType, SocialLinksPropsType>& SocialLinksPropsType> = ({ handleSubmit, contacts }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				Full Name
				{createField<ProfileDescriptionFormValuesKeys>([required, maxLength15, minLength5], undefined, 'fullName', Input, {
					className: 'input full-name',
				})}
			</div>
			<div>
				<label>
					{createField<ProfileDescriptionFormValuesKeys>([], undefined, 'lookingForAJob', Input, {
						className: 'looking-for-a-job',
						type: 'checkbox',
					})}
					Looking For A Job
				</label>
			</div>
			<div>
				My Skills
				{createField<ProfileDescriptionFormValuesKeys>([], undefined, 'lookingForAJobDescription', Textarea, {
					className: 'input looking-for-a-job-descr',
				})}
			</div>
			<div>
				About Me
				{createField<ProfileDescriptionFormValuesKeys>([required, maxLength15, minLength5], undefined, 'aboutMe', Textarea, {
					className: 'input about-me',
				})}
			</div>
			<div>
				Contacts
				{Object.keys(contacts).map((key) => {
					return (
						<div key={key}>
							{//FIXME: add generic to create field
							createField([], key, 'contacts.' + key, Input, {
								className: 'input contacts',
							})}
						</div>
					)
				})}
			</div>
			<Button text={'Save Changes'} color={'#28a745'} />
		</form>
	)
}

const ReduxProfileDescriptionForm = reduxForm<ProfileDescriptionFormValuesType, SocialLinksPropsType>({ form: 'edit-login' })(ProfileDescriptionForm)

type ProfileDescriptionFormValuesKeys =  ExtractStringKeys< ProfileDescriptionFormValuesType>

type ProfileDescriptionFormValuesType = UserDataType

type ProfileDescriptionPropsType = {
	userData: UserDataType|null
	status: string|null
	isMyPage: boolean
	updateUserStatus: (status: string | null) => void,
	updateUserData: (userData: UserDataType) => void,
}

const ProfileDescription:FC<ProfileDescriptionPropsType> = ({ updateUserData, userData, status, updateUserStatus, isMyPage }) => {
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		if (editMode) {
			console.log('edit on')
		}
	}, [editMode])

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
				{status&&<ProfileStatus isMyPage={isMyPage} status={status} updateUserStatus={updateUserStatus} />}
				{userData.lookingForAJob && <div> My skills:</div>}
				<pre className="skills">{userData.lookingForAJobDescription}</pre>
				<pre className="about-me">{userData.aboutMe}</pre>
				<SocialsLinks contacts={userData.contacts} />{' '}
				{isMyPage && <Button text={'Edit Description'} onClick={onClickEditDescription} />}
			</div>
		) : (
			userData&&<ReduxProfileDescriptionForm contacts={userData.contacts} onSubmit={onSubmit} initialValues={userData} />
		)}
	</div>
	)
}

type SocialLinksPropsType = {
	contacts: any
}

const SocialsLinks:FC<SocialLinksPropsType> = ({ contacts }) => {
	return (
		<div className="socials">
			{Object.keys(contacts).map((key) => {
				return contacts[key] && <SocialsLink key={key} name={key} url={contacts[key]} />
			})}
		</div>
	)
}

type SocialLinkPropsType = {
	name: string
	url: string
}

const SocialsLink:FC<SocialLinkPropsType> = ({ name, url }) => {
	return (
		<div>
			<SocialIcons
			className="socials-link"
			borderColor="rgba(255,255,255,0.25)"
			borderWidth="2"
			borderStyle="solid"
			iconColor="rgba(255,255,255,1)"
			backgroundColor="rgba(0,0,0,0)"
			iconSize="5"
			roundness="20%"
			size="45"
			icon={name === 'website' ? 'web' : name === 'mainLink' ? 'favorite' : name}
			url={url}
		/>
		</div>
	)
}

export default ProfileDescription