import React, { useEffect } from 'react';
import { SocialMediaIconsReact as SocialIcons } from 'social-media-icons-react';
import './profile-description.scss';
import ProfileStatus from './profile-status';
import { useState } from 'react';
import Button from '../../../common/button';
import { reduxForm } from 'redux-form';
import { required, maxLengthCreator, minLengthCreator } from '../../../../utils/validator';
import { Input, Textarea, createField } from '../../../common/forms-controls/forms-controls';

let maxLength15 = maxLengthCreator(30);

let minLength5 = minLengthCreator(5);

const ProfileName = ({ name }) => {
	return <div className="name">{name}</div>;
};

const ProfileDescription = ({ updateUserData, userData, status, updateUserStatus }) => {
	const [editMode, setEditMode] = useState(false);

	const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts } = userData;

	useEffect(() => {
		if (editMode) {
			console.log('edit on');
		}
	}, [editMode]);

	const onClickEditDescription = () => {
		setEditMode(true);
	};

	const onSubmit = (userData) => {
		updateUserData(userData);
		setEditMode(false);
	};

	return (
		<div className="description">
			{!editMode ? (
				<div>
					<ProfileName name={fullName} />
					<ProfileStatus status={status} updateUserStatus={updateUserStatus} />
					{lookingForAJob && <div> Looking for a job: {lookingForAJobDescription}</div>}
					{aboutMe}
					<SocialsLinks contacts={contacts} /> <Button text={'Edit Description'} onClick={onClickEditDescription} />
				</div>
			) : (
				<ReduxLoginForm contacts={contacts} onSubmit={onSubmit} initialValues={userData} />
			)}
		</div>
	);
};

const ProfileDescriptionForm = ({ handleSubmit, contacts }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				Full Name
				{createField([required, maxLength15, minLength5], null, 'fullName', Input, { className: 'input full-name' })}
			</div>
			<div>
				About Me
				{createField([required, maxLength15, minLength5], null, 'aboutMe', Textarea, {
					className: 'input about-me',
				})}
			</div>
			<div>
				<label>
					{createField(null, null, 'lookingForAJob', Input, {
						className: 'looking-for-a-job',
						type: 'checkbox',
					})}
					Looking For A Job
				</label>
			</div>
			<div>
				My Skills
				{createField([], null, 'lookingForAJobDescription', Textarea, {
					className: 'input looking-for-a-job-descr',
				})}
			</div>
			<div>
				Contacts
				{Object.keys(contacts).map((key) => {
					return <div key={key}>{createField([], key, 'contacts.' + key, Input, { className: 'input contacts' })}</div>;
				})}
			</div>
			<Button text={'Save Changes'} color={'#28a745'} />
		</form>
	);
};

const ReduxLoginForm = reduxForm({ form: 'edit-login' })(ProfileDescriptionForm);

const SocialsLinks = ({ contacts }) => {
	return (
		<div className="socials">
			{Object.keys(contacts).map((key) => {
				return contacts[key] && <SocialsLink key={key} name={key} url={contacts[key]} />;
			})}
			{/* <SocialIcons
				className="socials-link"
				backgroundColor="#00B8FF"
				iconSize="6"
				roundness="20%"
				icon="instagram"
				url=""
			/>
			<SocialIcons
				className="socials-link"
				backgroundColor="#00B8FF"
				iconSize="6"
				roundness="20%"
				icon="facebook"
				url=""
			/>
			<SocialIcons
				className="socials-link"
				backgroundColor="#00B8FF"
				iconSize="6"
				roundness="20%"
				icon="web"
				url=""
			/> */}
		</div>
	);
};

const SocialsLink = ({ name, url }) => {
	return (
		<div>
			<SocialIcons
				className="socials-link"
				borderColor="rgba(0,0,0,0.25)"
				borderWidth="2"
				borderStyle="solid"
				iconColor="rgba(255,255,255,1)"
				backgroundColor="rgba(28,186,223,1)"
				iconSize="5"
				roundness="20%"
				size="45"
				icon={name === ('website' || 'mainLink') ? 'web' : name}
				url={url}
			/>
		</div>
	);
};

export default ProfileDescription;
