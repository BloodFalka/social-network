import React, { FC } from 'react'
import { actions as PostActions } from '../../../redux/reducers/posts-reducer'
import { connect } from 'react-redux'
import NewPost from './new-post'
import withAuthRedirect from '../../hoc/with-auth-redirect'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/store'

const { addPost } = PostActions

type MapDispatchPropsType = {
	addPost: (text: string, id: number | string) => void,
}

type PropsType = MapDispatchPropsType

const NewPostContainer: FC<PropsType> = (props) => {
	return <NewPost addPost={props.addPost} />
}

const mapDispatchToProps = {
	addPost,
}

export default compose<React.FC>(
	connect<{}, MapDispatchPropsType, {}, AppStateType>(null, mapDispatchToProps),
	withAuthRedirect
)(NewPostContainer)
