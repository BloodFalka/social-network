import React, { useEffect, FC } from 'react'
import Button from '../../../common/button/button'
import { connect } from 'react-redux'
import { setFollow, setUnfollow } from '../../../../redux/reducers/users-reducer'
import { getIsFollowed } from '../../../../redux/reducers/profile-reducer'
import { AppStateType } from '../../../../redux/store'
import { selectIsFollowed } from '../../../../redux/selectors/profile-selector'
import { selectIsFollowingProgress } from '../../../../redux/selectors/users-selector'

type MapStatePropsType = {
    isFollowed: boolean|null
    isFollowingProgress: Array<number>
}

type MapDispatchPropsType = {
    setFollow: (userId:number) => void
    setUnfollow: (userId:number) => void
	getIsFollowed: (userId:number|null) => void
}

type OwnProps = {
    userId: number|null
}

type PropsType = MapStatePropsType&MapDispatchPropsType&OwnProps

const FollowButton:FC<PropsType> = ({userId, isFollowed, isFollowingProgress, setFollow, setUnfollow, getIsFollowed}) => {
    useEffect(() => {
        getIsFollowed(userId)
    }, [isFollowed]);

    const onClick = () =>  {
        userId&&(isFollowed? setUnfollow(userId): setFollow(userId) )
        getIsFollowed(userId)
    }

	const buttonText = isFollowed ? 'UNFOLLOW' : 'FOLLOW'
	const buttonColor = isFollowed ? '#f92b66' : '#00b8ff'
	return (
		<Button
			onClick={onClick}
			disabled={isFollowingProgress.some((item:number) => item === userId)}
			color={buttonColor}
			text={buttonText}
		/>
	)
}

const mapStateToProps = (state: AppStateType) => ({
    isFollowed: selectIsFollowed(state),
    isFollowingProgress: selectIsFollowingProgress(state)
})

const mapDispatchToProps = {
	setFollow,
	setUnfollow,
	getIsFollowed
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps)(FollowButton)
