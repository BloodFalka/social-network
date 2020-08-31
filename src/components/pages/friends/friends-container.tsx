import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import Friends from './friends'
import withAuthRedirect from '../../hoc/with-auth-redirect'
import { AppStateType } from '../../../redux/store'
import { selectFriends, selectIsLoading } from '../../../redux/selectors/friends-selector'
import { getFriends } from '../../../redux/reducers/friends-reducer'
import { FriendType } from '../../../types/types'
import Spinner from '../../common/spinner/spinner'

type MapStatePropsType = {
	friends: Array<FriendType>,
	isLoading: boolean,
}

type MapDispatchPropsType = {
	getFriends: () => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const FriendsContainer: FC<PropsType> = ({ getFriends, friends, isLoading }) => {
	useEffect(() => {
		getFriends()
		// eslint-disable-next-line
	}, [])

	return isLoading ? <Spinner /> : <Friends friends={friends} />
}

const mapStateToProps = (state: AppStateType) => ({
	friends: selectFriends(state),
	isLoading: selectIsLoading(state),
})

const mapDispatchToProps = { getFriends }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
	mapStateToProps,
	mapDispatchToProps
)(withAuthRedirect(FriendsContainer))
