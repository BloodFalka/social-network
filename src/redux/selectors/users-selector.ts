import { AppStateType } from '../store'

export const getUsers = (state: AppStateType) => {
	return state.searchPage.users
}

export const getPageSize = (state: AppStateType) => {
	return state.searchPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
	return state.searchPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
	return state.searchPage.currentPage
}

export const getIsLoading = (state: AppStateType) => {
	return state.searchPage.isLoading
}

export const getIsFollowingProgress = (state: AppStateType) => {
	return state.searchPage.isFollowingProgress
}

export const getIsError = (state: AppStateType) => {
	return state.searchPage.isError
}
