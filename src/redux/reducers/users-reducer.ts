import { getIsFollowed } from './profile-reducer';
import { UserType } from './../../types/types';
import { followAPI } from "../../api/followAPI";
import { usersAPI } from "../../api/usersAPI";
import { updateObjectInArray } from '../../utils/objects-helpers'
import { InferActionsTypes, BaseThunkType } from '../store';
import { Dispatch } from 'react';

//INITIAL STATE TYPE
//
let initialState = {
	users: [] as Array<UserType>,
	pageSize: 6,
	totalUsersCount: 0,
	currentPage: 1,
	FollowingProgress: [] as Array<number>,
	isLoading: false,
	isError: false,
}

export type InitialStateType = typeof initialState

//REDUCER
//
const usersReducer = (state = initialState, action:UsersActionTypes):InitialStateType => {
	switch (action.type) {
		case 'users/FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			}
		case 'users/UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			}
		case 'users/SET_USERS':
			return {
				...state,
				users: [...action.users],
			}
		case 'users/SET_TOTAL_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.count,
			}
		case 'users/SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.page

			}
		case 'users/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			}
		case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
			return {
				...state,
				FollowingProgress: action.isFollowingProgress
					? [...state.FollowingProgress, action.userId]
					: state.FollowingProgress.filter((id) => id !== action.userId),
			}
		case 'users/TOGGLE_ERROR':
			return {
				...state,
				isError: action.isError,
			}
		default:
			return state
	}
}


//ACTIONS TYPES
//
type UsersActionTypes = InferActionsTypes<typeof actions>

//ACTIONS
//
export const actions = {
	follow: (userId: number) => ({ type: 'users/FOLLOW', userId } as const),
	unfollow: (userId:number) => ({ type: 'users/UNFOLLOW', userId }as const),
	setUsers: (users:Array<UserType>) => ({ type: 'users/SET_USERS', users }as const),
	setTotalUsersCount: (count:number) => ({
		type: 'users/SET_TOTAL_USERS_COUNT',
		count,
	}as const),
	setCurrentPage: (page:number) => ({
		type: 'users/SET_CURRENT_PAGE',
		page,
	}as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'users/TOGGLE_LOADING',
		isLoading,
	}as const),
	toggleError: (isError:boolean) => ({
		type: 'users/TOGGLE_ERROR',
		isError,
	}as const),
	toggleFollowingProgress: (isFollowingProgress:boolean, userId:number) => ({
		type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
		isFollowingProgress,
		userId,
	}as const)
}

//THUNKS
type DispatchType = Dispatch<UsersActionTypes>
type ThunkType = BaseThunkType<UsersActionTypes>

export const getUsers = (pageSize:number, currentPage:number):ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleLoading(true))
		const term = getState().app.searchTerm

		const data = await usersAPI.getUsers(pageSize, currentPage, term)

		dispatch(actions.setUsers(data.items))
		dispatch(actions.setCurrentPage(currentPage))
		dispatch(actions.setTotalUsersCount(data.totalCount))
		dispatch(actions.toggleLoading(false))
	}
}

type DispatchThunkType = any

const _followUnfollowFlow = async (dispatch:DispatchType|DispatchThunkType, userId:number, apiMethod:typeof followAPI.unfollow|typeof followAPI.follow, actionCreator:(userId:number)=>UsersActionTypes) => {
	dispatch(actions.toggleFollowingProgress(true, userId))

	let data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
		dispatch(getIsFollowed(userId))
	} else {
		dispatch(actions.toggleError(true))
	}
	dispatch(actions.toggleFollowingProgress(false, userId))
}

export const setFollow = (userId:number):ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch, userId, followAPI.follow.bind(followAPI), actions.follow)
	}
}

export const setUnfollow = (userId:number):ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch,  userId, followAPI.unfollow.bind(followAPI), actions.unfollow)
	}
}

export default usersReducer
