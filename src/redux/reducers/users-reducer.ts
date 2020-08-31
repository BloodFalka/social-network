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
	searchTerm: '',
}

type initialStateType = typeof initialState

//REDUCER
//
const usersReducer = (state = initialState, action:UsersActionTypes):initialStateType => {
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
		case 'users/SET_NEXT_PAGE':
			return {
				...state,
				currentPage:
					state.currentPage + 1 > Math.ceil(state.totalUsersCount / state.pageSize) ? 1 : state.currentPage + 1,
			}
		case 'users/SET_PREVIOUS_PAGE':
			return {
				...state,
				currentPage:
					state.currentPage - 1 < 1 ? Math.ceil(state.totalUsersCount / state.pageSize) : state.currentPage - 1,
			}
		case 'users/UPDATE_TERM':
			return {
				...state,
				searchTerm: action.term,
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
	setNextPage: () => ({
		type: 'users/SET_NEXT_PAGE',
	}as const),
	setPreviousPage: () => ({
		type: 'users/SET_PREVIOUS_PAGE',
	}as const),
	updateTerm: (term:string) => ({ type: 'users/UPDATE_TERM', term }as const),
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

export const getUsers = (totalUsersCount:number, pageSize:number, currentPage:number, page?:'prev'|'next'):ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleLoading(true))
		const term = getState().usersPage.searchTerm
		const pagesCount = totalUsersCount / pageSize

		const prevPage = currentPage - 1 < 1 ? Math.ceil(pagesCount) : currentPage - 1
		const nextPage = currentPage + 1 > Math.ceil(pagesCount) ? 1 : currentPage + 1

		const showingPage = page === 'prev' ? prevPage : page === 'next' ? nextPage : currentPage
		let data = await usersAPI.getUsers(showingPage, pageSize, term)

		dispatch(actions.toggleLoading(false))
		page === 'prev' && dispatch(actions.setPreviousPage())
		page === 'next' && dispatch(actions.setNextPage())

		dispatch(actions.setUsers(data.items))

		dispatch(actions.setTotalUsersCount(data.totalCount))
	}
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:typeof followAPI.setUnfollow|typeof followAPI.setFollow, actionCreator:(userId:number)=>UsersActionTypes) => {
	dispatch(actions.toggleFollowingProgress(true, userId))

	let data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
		//TODO: is just for api test
		let followed = await followAPI.getIsMeFollow(userId)
		console.log(`I follow on user id=${userId}: ${followed}`)
		//TODO: getIsMeFollow api works fine
	} else {
		dispatch(actions.toggleError(true))
	}
	dispatch(actions.toggleFollowingProgress(false, userId))
}

export const setFollow = (userId:number):ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, userId, followAPI.setFollow.bind(followAPI), actions.follow)
	}
}

export const setUnfollow = (userId:number):ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, userId, followAPI.setUnfollow.bind(followAPI), actions.unfollow)
	}
}

export default usersReducer
