import React from 'react';
import './friends.scss';
import Friend from './friend/friend';
import { connect } from 'react-redux';

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
const mapStateToProps = (state) => {
	return { friends: state.friendsPage.friends };
};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
