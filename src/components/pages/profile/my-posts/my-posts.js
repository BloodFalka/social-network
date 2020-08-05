import React from 'react';
import MyPost from './my-post';
import './my-posts.scss';

const MyPosts = (props) => {
	const posts = props.posts.map((item) => {
		return <MyPost key={item.id} images={item.images} message={item.message} />;
	});

	return <div className="my-posts">{posts}</div>;
};

export default MyPosts;
