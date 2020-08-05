import React from 'react';
import {
	addPostActionCreator,
	updateNewPostActionCreator,
} from '../../../redux/reducers/new-post-reducer.js';
import { connect } from 'react-redux';
import NewPost from './new-post';

const mapStateToProps = (state) => {
	return {
		value: state.newPostPage.newPostText,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateNewPostText: (text) => dispatch(updateNewPostActionCreator(text)),
		addPost: () => dispatch(addPostActionCreator()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
