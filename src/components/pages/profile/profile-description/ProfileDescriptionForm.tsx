import React, { FC } from 'react'
import Button from '../../../common/button/button'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../../../utils/validator'
import {
	Input,
	Textarea,
	createField,
	ExtractStringKeys,
} from '../../../common/forms-controls/forms-controls'
import { SocialLinksPropsType } from './socials/SocialLinks'
import { maxLengthCreator, minLengthCreator } from '../../../../utils/validator'
import { UserDataType } from '../../../../types/types'

const maxLength15 = maxLengthCreator(15)
const maxLength200 = maxLengthCreator(200)
const minLength5 = minLengthCreator(5)

export type ProfileDescriptionFormValuesKeys = ExtractStringKeys<ProfileDescriptionFormValuesType>

export type ProfileDescriptionFormValuesType = UserDataType

const ProfileDescriptionForm: FC<
	InjectedFormProps<ProfileDescriptionFormValuesType, SocialLinksPropsType> & SocialLinksPropsType
> = ({ handleSubmit, contacts }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				Full Name
				{createField<ProfileDescriptionFormValuesKeys>(
					[required, maxLength15, minLength5],
					undefined,
					'fullName',
					Input,
					{
						className: 'input full-name',
					}
				)}
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
				{createField<ProfileDescriptionFormValuesKeys>(
					[maxLength200, minLength5],
					undefined,
					'aboutMe',
					Textarea,
					{
						className: 'input about-me',
					}
				)}
			</div>
			<div>
				Contacts
				{Object.keys(contacts).map((key) => {
					//TODO: create solution for embedded obj
					return (
						<div key={key}>
							{createField([], key, 'contacts.' + key, Input, {
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

export const ReduxProfileDescriptionForm = reduxForm<ProfileDescriptionFormValuesType, SocialLinksPropsType>({
	form: 'edit-login',
})(ProfileDescriptionForm)

export default ProfileDescriptionForm
