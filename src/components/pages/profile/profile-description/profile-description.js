import React from 'react';
import { SocialMediaIconsReact as SocialIcons } from 'social-media-icons-react';
import './profile-description.scss';

const ProfileName = (props) => {
	return <div className="name">{props.name}</div>;
};

const ProfileDescription = (props) => {
	const {
		fullName,
		aboutMe,
		lookingForAJob,
		lookingForAJobDescription,
	} = props.userData;

	const lookingForAJobTemplate = lookingForAJob ? (
		<div> Looking for a job: {lookingForAJobDescription}</div>
	) : null;
	return (
		<div className="description">
			<ProfileName name={fullName} />
			{/* <div className="birth-date">Date of Birth: {dateOfBirth}</div> */}
			<div className="aboutMe">{aboutMe}</div>
			{lookingForAJobTemplate}
			<div className="socials">
				{/* <div className="socials-title">Other socials:</div>
	            <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="instagram" url=""/>
	            <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="facebook" url=""/>
		            <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="web" url=""/> */}
			</div>
		</div>
	);
};

export default ProfileDescription;
