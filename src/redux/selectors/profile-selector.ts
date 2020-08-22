import { AppStateType } from '../store'

export const selectUserData = (state: AppStateType) =>
	state.profilePage.userData
export const selectUserStatus = (state: AppStateType) =>
	state.profilePage.status
export const selectIsLoading = (state: AppStateType) =>
	state.profilePage.isLoading
