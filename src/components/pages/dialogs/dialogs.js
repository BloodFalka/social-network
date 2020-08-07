import React from 'react';
import './dialogs.scss';
import Messages from './messages';
import Dialog from './dialog';
import NewMessageContainer from './newMessage';

const Dialogs = (props) => {
	const dialogs = props.dialogs.map((item) => {
		return (
			<Dialog
				key={item.id}
				id={item.id}
				name={item.name}
				avatar={item.avatar}
			/>
		);
	});
	return (
		<div className="dialogs">
			<div className="dialogs-items">{dialogs}</div>
			<Messages />
			<NewMessageContainer />
		</div>
	);
};

export default Dialogs;
