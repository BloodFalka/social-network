import React from 'react';
import './new-message.scss';
import Button from '../../../common/button';
import { connect } from 'react-redux';
import { addMessage } from '../../../../redux/reducers/message-reducer';
import { reduxForm, Field } from 'redux-form';

const NewMessageForm = (props) => {
	return (
		<form className="new-message" onSubmit={props.handleSubmit}>
			<Field
				component={'textarea'}
				placeholder="Enter your message"
				type={'textarea'}
				name={'messageText'}
				className="text-field"
			></Field>
			<Button text="Send" />
		</form>
	);
};

const ReduxNewMessageForm = reduxForm({ form: 'new-message' })(NewMessageForm);

const NewMessage = (props) => {
	const onSubmit = (formData) => {
		if (formData.messageText) {
			props.addMessage(formData.messageText);
		}
	};

	return <ReduxNewMessageForm onSubmit={onSubmit} />;
};

const mapStateToProps = (state) => {
	return {
		value: state.messagePage.newMessageText,
	};
};
const mapDispatchToProps = {
	addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
