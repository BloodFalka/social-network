import React from 'react';
import './dialogs.scss';
import Messages from './messages';
import Dialog from './dialog';
import NewMessageContainer from './newMessage';
import { connect } from 'react-redux';

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
const mapStateToProps = (state) => {
	return { dialogs: state.messagePage.dialogs };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
