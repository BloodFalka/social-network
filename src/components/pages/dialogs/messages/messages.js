import React from 'react';
import './messages.scss';
import Message from './message';
import { connect } from 'react-redux';

const Messages = (props) => {
	const messages = props.messages.map((item) => {
		return (
			<Message
				key={item.id}
				id={item.id}
				message={item.message}
				avatar={item.avatar}
			/>
		);
	});
	return <div className="messages">{messages}</div>;
};

const mapStateToProps = (state) => {
	return {
		messages: state.messagePage.messages,
	};
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
