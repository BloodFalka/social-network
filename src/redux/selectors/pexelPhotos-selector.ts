import { AppStateType } from '../store'

export const selectPhotos = (state: AppStateType) => {
	return state.pixelPhotosPage.photos
}

export const selectFindedPhotosCount = (state: AppStateType) => {
	return state.pixelPhotosPage.findedPhotosCount
}

export const selectNextPhotosPageUrl = (state: AppStateType) => {
	return state.pixelPhotosPage.nextPageUrl
}

export const selectSearchTerm = (state: AppStateType): string => {
	return state.pixelPhotosPage.searchTerm
}

export const selectIsLoading = (state: AppStateType) => {
	return state.pixelPhotosPage.isLoading
}

export const selectIsLoadingNextPage = (state: AppStateType) => {
	return state.pixelPhotosPage.isLoadingNextPage
}

export const selectIsError = (state: AppStateType) => {
	return state.pixelPhotosPage.isError
}
