import React, { FC } from 'react'
import MyPost from './my-post/my-post'
import './my-posts.scss'
import { PostsType } from '../../../../types/types'

type PropsType = {
	posts: Array<PostsType>,
	isMyPage: boolean
	addLike: (postId: number|string) => void,
	removeLike: (postId: number|string) => void,
	removePost: (postId: number|string) => void,
	editPost: (postId: number|string, text: string) => void,
}

const MyPosts: FC<PropsType> = (props) => {
	const posts = props.posts.map((item) => {
		return (
			<MyPost
				key={item.id}
				images={item.images}
				message={item.message}
				addLike={props.addLike}
				removeLike={props.removeLike}
				removePost={props.removePost}
				editPost={props.editPost}
				likesCount={item.likesCount}
				liked={item.liked}
				id={item.id}
				isMyPage={props.isMyPage}
			/>
		)
	})

	return <div className="my-posts">{posts}</div>
}

export default React.memo(MyPosts)
