import { updateUserPhoto, getUserProfile } from './profile-reducer';
import { InferActionsTypes, BaseThunkType } from '../store';
import { PexelsPhotosType, pexelsPhotosAPI } from '../../api/pexelsPhotosAPI';


//INITIAL STATE TYPE
//
let initialState = {
    photos: [] as Array<PexelsPhotosType>,
	searchTerm: '',
	findedPhotosCount: null as number|null,
	nextPageUrl: '',
	isLoading: false,
	isLoadingNextPage: false,
    isError: false
}

type initialStateType = typeof initialState

//REDUCER
//
const pixelPhotosReducer = (state = initialState, action:PixelPhotosActionTypes):initialStateType => {
	switch (action.type) {
		case 'pixelPhotos/SET_PHOTOS':
			return {
				...state,
				photos: [...action.photos],
			}
		case 'pixelPhotos/ADD_PHOTOS':
			return {
				...state,
				photos: [...state.photos, ...action.photos],
			}
		case 'pixelPhotos/SET_NEXT_PAGE_URL':
			return{
				...state,
				nextPageUrl: action.url
			}
		case 'pixelPhotos/SET_TOTAL_PHOTOS_COUNT':
			return {
				...state,
				findedPhotosCount: action.count,
			}
		case 'pixelPhotos/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			}
		case 'pixelPhotos/TOGGLE_LOADING_NEXT_PAGE':
			return {
				...state,
				isLoadingNextPage: action.isLoading,
			}
		case 'pixelPhotos/TOGGLE_ERROR':
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
type PixelPhotosActionTypes = InferActionsTypes<typeof actions>

//ACTIONS
//
export const actions = {
	setPhotos: (photos:Array<PexelsPhotosType>) => ({ type: 'pixelPhotos/SET_PHOTOS', photos }as const),
	setNextPageUrl: (url: string) => ({ type: 'pixelPhotos/SET_NEXT_PAGE_URL', url }as const),
	addPhotosFromNextPage: (photos:Array<PexelsPhotosType>) => ({ type: 'pixelPhotos/ADD_PHOTOS', photos }as const),
	setFindedPhotosCount: (count:number|null) => ({
		type: 'pixelPhotos/SET_TOTAL_PHOTOS_COUNT',
		count,
	}as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'pixelPhotos/TOGGLE_LOADING',
		isLoading,
	}as const),
	toggleLoadingNextPage: (isLoading:boolean) => ({
		type: 'pixelPhotos/TOGGLE_LOADING_NEXT_PAGE',
		isLoading,
	}as const),
	toggleError: (isError:boolean) => ({
		type: 'pixelPhotos/TOGGLE_ERROR',
		isError,
	}as const)
}

//THUNKS
type ThunkType = BaseThunkType<PixelPhotosActionTypes>


export const getPhotos = (photosPerPage?:number):ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleLoading(true))

		const term = getState().app.searchTerm
		const nextPage = getState().pixelPhotosPage.nextPageUrl

		let data = term === ''?
					await pexelsPhotosAPI.getModeratedPhotos(photosPerPage):
					await pexelsPhotosAPI.getSearchedPhotos(photosPerPage, term)

		if(data.total_results){
			dispatch(actions.setFindedPhotosCount(data.total_results))
		}else{
			dispatch(actions.setFindedPhotosCount(null))
		}

		if(data.next_page && data.next_page !== nextPage){
			dispatch(actions.setNextPageUrl(data.next_page))
		}else{
			dispatch(actions.setNextPageUrl(''))
		}

		dispatch(actions.setPhotos(data.photos))

        dispatch(actions.toggleLoading(false))
    }
}

export const getPhotosFromNextPage = ():ThunkType => {
    return async (dispatch, getState) => {
		dispatch(actions.toggleLoadingNextPage(true))
        const nextPage = getState().pixelPhotosPage.nextPageUrl
		if(nextPage!==''){
			let data = await pexelsPhotosAPI.getNextPage(nextPage)
			if(data.next_page && data.next_page !== nextPage){
				dispatch(actions.setNextPageUrl(data.next_page))
				dispatch(actions.addPhotosFromNextPage(data.photos))
			}else{
				dispatch(actions.setNextPageUrl(''))
			}
		} 
		dispatch(actions.toggleLoadingNextPage(false))
    }
}

export const updateUserPhotoFromPexel = (url: string):ThunkType => {
	return async(dispatch, getState) => {
		const response = await fetch(url);
		// here image is url/location of image
		const blob = await response.blob();
		const file = new File([blob], 'image.jpg', {type: blob.type});

		if(getState().profilePage.userData){
			dispatch(updateUserPhoto(file))
		}else {
			const userId = getState().auth.data.userId,
					isAuth= getState().auth.isAuth

			console.log('no-Data')
			dispatch(getUserProfile(userId, isAuth)).then(()=>
				dispatch(updateUserPhoto(file))
			)

		}
	}
}

export default pixelPhotosReducer
