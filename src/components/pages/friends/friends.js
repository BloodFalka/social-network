import React from 'react';
import './friends.scss';
import Friend from './friend/friend';

const Friends = (props) => {
	const friends = props.friends.map((item) => {
		return (
			<Friend
				key={item.id}
				name={item.name}
				avatar={item.avatar}
				status={item.status}
			/>
		);
	});

	return <div className="friends">{friends}</div>;
};

export default Friends;
