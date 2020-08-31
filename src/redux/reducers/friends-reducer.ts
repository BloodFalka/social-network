import { FriendType } from '../../types/types'
import { InferActionsTypes, BaseThunkType } from '../store'
import { usersAPI } from "../../api/usersAPI"

type initialStateType = {
	friends: Array<FriendType>,
	isLoading: boolean
	isError: boolean
}

let initialState: initialStateType = {
	friends: [],
	isLoading: false,
	isError: false
}

//REDUCER
//
const friendsReducer = (state = initialState, action: FriendsActionsTypes): initialStateType => {
	switch (action.type) {
		case 'friends/SET_FRIENDS':
			return {
				...state,
				friends: [...action.friends],
			}
		case 'friends/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			}
		case 'friends/TOGGLE_ERROR':
			return {
				...state,
				isError: action.isError,
			}
		default:
			return { ...state }
	}
}

//ACTIONS TYPES
//
type FriendsActionsTypes = InferActionsTypes<typeof actions>


//ACTIONS
//
export const actions = {
	setFriends: (friends:Array<FriendType>) => ({ type: 'friends/SET_FRIENDS', friends }as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'friends/TOGGLE_LOADING',
		isLoading,
	}as const),
	toggleError: (isError:boolean) => ({
		type: 'friends/TOGGLE_ERROR',
		isError,
	setFriends: (friends:Array<FriendType>) => ({ type: 'friends/SET_FRIENDS', friends })
	}as const)
}

//THUNKS
//
type ThunkType = BaseThunkType<FriendsActionsTypes>

export const getFriends = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true))
		let data = await usersAPI.getUsers(1, 50, '', true)
		const friends = data.items.map(item =>{
			return {
				id: item.id,
				name: item.name,
				status: item.status,
				avatar: item.photos.small
			}
		})
		dispatch(actions.setFriends(friends))
		dispatch(actions.toggleLoading(false))
	}
}

export default friendsReducer
