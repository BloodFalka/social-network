import { userType } from './../../types/types';
import { usersAPI, followAPI } from '../../api'
import { updateObjectInArray } from '../../utils/objects-helpers'

const FOLLOW = 'users/FOLLOW',
	UNFOLLOW = 'users/UNFOLLOW',
	SET_USERS = 'users/SET_USERS',
	SET_PREVIOUS_PAGE = 'users/SET_PREVIOUS_PAGE',
	SET_NEXT_PAGE = 'users/SET_NEXT_PAGE',
	SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
	UPDATE_TERM = 'users/UPDATE_TERM',
	TOGGLE_LOADING = 'users/TOGGLE_LOADING',
	TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
	TOGGLE_ERROR = 'users/TOGGLE_LOADING'


let initialState = {
	users: [] as Array<userType>,
	pageSize: 6,
	totalUsersCount: 0,
	currentPage: 1,
	isFollowingProgress: [] as Array<number>,
	isLoading: false,
	isError: false,
	searchTerm: '',
}

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action:any):initialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			}
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			}
		case SET_USERS:
			return {
				...state,
				users: [...action.users],
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.count,
			}
		case SET_NEXT_PAGE:
			return {
				...state,
				currentPage:
					state.currentPage + 1 > Math.ceil(state.totalUsersCount / state.pageSize) ? 1 : state.currentPage + 1,
			}
		case SET_PREVIOUS_PAGE:
			return {
				...state,
				currentPage:
					state.currentPage - 1 < 1 ? Math.ceil(state.totalUsersCount / state.pageSize) : state.currentPage - 1,
			}
		case UPDATE_TERM:
			return {
				...state,
				searchTerm: action.term,
			}
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				isFollowingProgress: action.isFollowingProgress
					? [...state.isFollowingProgress, action.userId]
					: state.isFollowingProgress.filter((id) => id !== action.userId),
			}
		case TOGGLE_ERROR:
			return {
				...state,
				isError: action.isError,
			}
		default:
			return state
	}
}

type usersActionTypes = followActionType|
unfollowActionType|
setUsersActionType|
setTotalUsersCountActionType|
setNextPageActionType|
setPreviousPageActionType|
updateTermActionType|
toggleLoadingActionType|
toggleFollowingProgressActionType|
toggleErrorActionType
//ACTIONS

type followActionType = {
	type: typeof FOLLOW
	userId: number
}

type unfollowActionType = {
	type: typeof UNFOLLOW
	userId: number
}

type setUsersActionType = {
	type: typeof SET_USERS
	users: Array<userType>
}

type setTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	count: number
}

type setNextPageActionType = {
	type: typeof SET_NEXT_PAGE
}

type setPreviousPageActionType = {
	type: typeof SET_PREVIOUS_PAGE
}

type updateTermActionType = {
	type: typeof UPDATE_TERM
	term: string
}
type toggleLoadingActionType = {
	type: typeof TOGGLE_LOADING
	isLoading: boolean
}
type toggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFollowingProgress: boolean
	userId: number
}
type toggleErrorActionType = {
	type: typeof TOGGLE_ERROR
	isError: boolean
}

export const follow = (userId: number):followActionType => ({ type: FOLLOW, userId })
export const unfollow = (userId:number):unfollowActionType => ({ type: UNFOLLOW, userId })
export const setUsers = (users:Array<userType>):setUsersActionType => ({ type: SET_USERS, users })
export const setTotalUsersCount = (count:number):setTotalUsersCountActionType => ({
	type: SET_TOTAL_USERS_COUNT,
	count,
})
export const setNextPage = ():setNextPageActionType => ({
	type: SET_NEXT_PAGE,
})
export const setPreviousPage = ():setPreviousPageActionType => ({
	type: SET_PREVIOUS_PAGE,
})
export const updateTerm = (term:string):updateTermActionType => ({ type: UPDATE_TERM, term })

export const toggleLoading = (isLoading:boolean):toggleLoadingActionType => ({
	type: TOGGLE_LOADING,
	isLoading,
})
export const toggleFollowingProgress = (isFollowingProgress:boolean, userId:number):toggleFollowingProgressActionType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFollowingProgress,
	userId,
})
export const toggleError = (isError:boolean):toggleErrorActionType => ({
	type: TOGGLE_ERROR,
	isError,
})

//THUNKS

export const requestUsers = (totalUsersCount:number, pageSize:number, currentPage:number, page:any = false) => {
	return async (dispatch:any, getState:any) => {
		dispatch(toggleLoading(true))
		const term = getState().searchPage.searchTerm
		let data = await usersAPI.requestUsers(totalUsersCount, pageSize, currentPage, page, term)

		dispatch(toggleLoading(false))
		page === 'prev' && dispatch(setPreviousPage())
		page === 'next' && dispatch(setNextPage())

		dispatch(setUsers(data.items))

		dispatch(setTotalUsersCount(data.totalCount))
	}
}

const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
	dispatch(toggleFollowingProgress(true, userId))

	let data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
	} else {
		dispatch(toggleError(true))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const setFollow = (userId:number) => {
	return async (dispatch:any) => {
		followUnfollowFlow(dispatch, userId, followAPI.setFollow.bind(followAPI), follow)
	}
}

export const setUnfollow = (userId:number) => {
	return async (dispatch:any) => {
		followUnfollowFlow(dispatch, userId, followAPI.setUnfollow.bind(followAPI), unfollow)
	}
}

export default usersReducer
