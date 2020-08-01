import React from 'react';
import MyPost from './my-post';
import './my-posts.scss';
import { connect } from 'react-redux';

const MyPosts = (props) => {
	const posts = props.posts.map((item) => {
		return <MyPost key={item.id} images={item.images} message={item.message} />;
	});

	return <div className="my-posts">{posts}</div>;
};

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
	};
};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
