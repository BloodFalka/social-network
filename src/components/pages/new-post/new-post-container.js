import React from 'react';
import { addPost } from '../../../redux/reducers/new-post-reducer.js';
import { connect } from 'react-redux';
import NewPost from './new-post';
import withAuthRedirect from '../../hoc/with-auth-redirect.js';
import { compose } from 'redux';

const NewPostContainer = (props) => {
	return (
		<NewPost
			value={props.value}
			updateNewPostText={props.updateNewPostText}
			addPost={props.addPost}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		value: state.newPostPage.newPostText,
	};
};

const mapDispatchToProps = {
	addPost,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(NewPostContainer);
