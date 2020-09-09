import { AppStateType } from '../store'

export const selectDialogs = (state: AppStateType) => state.dialogs.dialogs
export const selectIsLoading = (state: AppStateType) => state.dialogs.isLoading
