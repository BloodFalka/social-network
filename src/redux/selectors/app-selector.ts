import { AppStateType } from '../store'

export const selectInitialized = (state: AppStateType) => state.app.initialized

export const selectSearchTerm = (state: AppStateType): string => {
	return state.app.searchTerm
}
