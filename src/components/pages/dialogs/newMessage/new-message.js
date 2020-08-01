import React from 'react';
import './new-message.scss';
import Button from '../../../button';
import { connect } from 'react-redux';
import {
	updateNewMessageActionCreator,
	addMessageActionCreator,
} from '../../../../redux/actions';

const NewMessage = (props) => {
	const onClickAddNewMessage = () => {
		if (props.value) {
			props.sendMessage();
		}
	};

	const onChangeMessageArea = (e) => {
		let text = e.target.value;
		props.updateNewMessageText(text);
	};

	return (
		<div className="new-message">
			<textarea
				onChange={onChangeMessageArea}
				value={props.value}
				placeholder="Enter your message"
				className="text-field"
			></textarea>
			<Button onClick={onClickAddNewMessage} text="Send" />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		value: state.messagePage.newMessageText,
	};
};
const mapDispatchToProps = (dispatch) => ({
	updateNewMessageText: (text) => dispatch(updateNewMessageActionCreator(text)),
	sendMessage: () => dispatch(addMessageActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
