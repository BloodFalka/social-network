import React from 'react';
import { SocialMediaIconsReact as SocialIcons } from 'social-media-icons-react';
import './profile-description.scss';
import { connect } from 'react-redux';

const ProfileName = (props) => {
	return <div className="name">{props.name}</div>;
};

const ProfileDescription = (props) => {
	const { name, dateOfBirth, city } = props.data;
	return (
		<div className="description">
			<ProfileName name={name} />
			<div className="birth-date">Date of Birth: {dateOfBirth}</div>
			<div className="city">City: {city}</div>
			<div className="socials">
				{/* <div className="socials-title">Other socials:</div>
                    <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="instagram" url=""/>
                    <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="facebook" url=""/>
                    <SocialIcons className='socials-link' backgroundColor='#00B8FF' iconSize="6" roundness="20%" icon="web" url=""/> */}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.profilePage.data,
	};
};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDescription);
