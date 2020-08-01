import React, { Component } from 'react';
import './new-post.scss';
import Button from '../../button';
import { Redirect } from 'react-router';

export default class NewPost extends Component {
	state = {
		redirect: false,
	};

	onAddPost = () => {
		if (this.props.value) {
			this.props.addPost();
			this.setState({
				redirect: true,
			});
		}
	};

	onChangePost = (e) => {
		let text = e.target.value;
		this.props.updateNewPostText(text);
	};

	render() {
		return this.state.redirect ? (
			<Redirect push to="/profile" />
		) : (
			<div className="new-post">
				<textarea
					onChange={this.onChangePost}
					value={this.props.value}
					className="text-field"
				></textarea>
				<Button onClick={this.onAddPost} text="Post" />
			</div>
		);
	}
}
