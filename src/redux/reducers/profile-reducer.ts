import { userDataType, photosType , userPhotoFileType} from './../../types/types';
import { profileAPI } from '../../api';

const SET_USER = 'profile/SET_USER',
	TOGGLE_LOADING = 'profile/TOGGLE_LOADING',
	SET_STATUS = 'profile/SET_STATUS',
	SET_PHOTOS = 'profile/SET_PHOTOS';

let initialState = {
	userData: null as userDataType|null,
	status: '' as string|null,
	isLoading: false
};

type initialStateType = typeof initialState

type profileActionsTypes = setUserDataActionType|toggleLoadingActionType|setUserStatusActionType|setUserPhotosActionType

const profileReducer = (state = initialState, action:profileActionsTypes):initialStateType => {
	switch (action.type) {
		case SET_USER:
			return { ...state, userData: action.userData };
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			};
		case SET_PHOTOS:
			return {
				...state,
				userData: {
					...state.userData,
					photos: action.photos
				} as userDataType
			}
		default:
			return state;
	}
};

type setUserDataActionType = {
	type: typeof SET_USER
	userData: userDataType
}

type toggleLoadingActionType = {
	type: typeof TOGGLE_LOADING
	isLoading: boolean
}

type setUserStatusActionType = {
	type: typeof SET_STATUS
	status: string|null
}

type setUserPhotosActionType = {
	type: typeof SET_PHOTOS
	photos: photosType
}

export const setUserData = (userData:userDataType):setUserDataActionType => ({
	type: SET_USER,
	userData,
});
export const toggleLoading = (isLoading:boolean):toggleLoadingActionType => ({
	type: TOGGLE_LOADING,
	isLoading,
});
export const setUserStatus = (status:string|null):setUserStatusActionType => ({
	type: SET_STATUS,
	status,
});
export const setUserPhotos = (photos:photosType ):setUserPhotosActionType => ({
	type: SET_PHOTOS,
	photos,
});

export const getUserProfile = (userId:number, isAuth:boolean) => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));

		if (!isAuth) {
			return;
		}

		let data = await profileAPI.getProfile(userId);
		dispatch(toggleLoading(false));
		dispatch(setUserData(data));
	};
};

export const getUserStatus = (userId: number) => {
	return async (dispatch:any) => {
		let response = await profileAPI.getStatus(userId);debugger
		dispatch(setUserStatus(response));
	};
};

export const updateUserStatus = (status: string|null  ) => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));
		let response = await profileAPI.setStatus(status);
		if (response.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
		dispatch(toggleLoading(false));
	};
};


export const updateUserPhoto = (photo:userPhotoFileType) => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));
		let response = await profileAPI.setAvatar(photo);debugger
		if (response.resultCode === 0) {
			dispatch(setUserPhotos(response.data.photos));
		}
		dispatch(toggleLoading(false));
	};
};

export const updateUserData = (userData:userDataType) => {
	return async (dispatch:any, getState:any) => {
		dispatch(toggleLoading(true));

		let response = await profileAPI.setUserData(userData);debugger
		if (response.resultCode === 0) {
			dispatch(getUserProfile(getState().profilePage.userData.userId, true));
		}
		dispatch(toggleLoading(false));
	};
};

export default profileReducer;
