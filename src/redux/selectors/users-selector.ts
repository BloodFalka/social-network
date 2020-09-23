import { AppStateType } from '../store'

export const selectUsers = (state: AppStateType) => {
	return state.usersPage.users
}

export const selectPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}

export const selectTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount
}

export const selectCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}

export const selectIsLoading = (state: AppStateType) => {
	return state.usersPage.isLoading
}

export const selectIsFollowingProgress = (state: AppStateType) => {
	return state.usersPage.FollowingProgress
}

export const selectIsError = (state: AppStateType) => {
	return state.usersPage.isError
}
