import React, { Component } from 'react';
import './new-post.scss';
import Button from '../../common/button';
import { Redirect } from 'react-router';
import { reduxForm, Field } from 'redux-form';

const NewPostForm = (props) => {
	return (
		<form className="new-post" onSubmit={props.handleSubmit}>
			<Field
				component={'textarea'}
				placeholder={'Enter your post text'}
				type={'textarea'}
				name={'postText'}
				className="text-field"
			></Field>
			<Button text="Post" />
		</form>
	);
};

const ReduxNewPostForm = reduxForm({ form: 'new-post' })(NewPostForm);

export default class NewPost extends Component {
	state = {
		redirect: false,
	};

	onSubmit = (formData) => {
		console.log(formData);

		if (formData.postText) {
			this.props.addPost(formData.postText);
			this.setState({
				redirect: true,
			});
		}
	};

	render() {
		return this.state.redirect ? (
			<Redirect to="/profile" />
		) : (
			<ReduxNewPostForm onSubmit={this.onSubmit} />
		);
	}
}
