import React from 'react';
import Button from '../../../../button';
import './user.scss';
import { NavLink } from 'react-router-dom';

const User = (props) => {
	const {
		name,
		status,
		followed,
		id,
		onFollow,
		onUnfollow,
		isFollowingProgress,
	} = props;
	const buttonText = followed ? 'UNFOLLOW' : 'FOLLOW';
	const buttonColor = followed ? '#f92b66' : '#00b8ff';
	const avatar = {
		backgroundImage: props.avatar
			? `url(${props.avatar})`
			: `url("https://image.flaticon.com/icons/png/512/206/206858.png")`,
	};

	return (
		<div className="user">
			<NavLink to={`profile/${id}`} className="avatar-nav">
				<div className="avatar" style={avatar}></div>
			</NavLink>
			<div className="description">
				<div className="name">{name}</div>
				<div className="status">{status}</div>
				<Button
					onClick={() => {
						followed ? onUnfollow(id) : onFollow(id);
					}}
					disabled={isFollowingProgress.some((item) => item === id)}
					color={buttonColor}
					text={buttonText}
				/>
			</div>
		</div>
	);
};

export default User;
