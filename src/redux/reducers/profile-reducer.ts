import { UserDataType, PhotosType } from './../../types/types';
import { profileAPI } from "../../api/profileAPI";
import { InferActionsTypes, BaseThunkType } from '../store';

//INITIAL STATE TYPE
let initialState = {
	userData: null as UserDataType|null,
	status: '' as string|null,
	isLoading: false
};

type initialStateType = typeof initialState

//REDUCER
//
const profileReducer = (state = initialState, action:ProfileActionsTypes):initialStateType => {
	switch (action.type) {
		case 'profile/SET_USER':
			return { ...state, userData: action.userData };
		case 'profile/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		case 'profile/SET_STATUS':
			return {
				...state,
				status: action.status,
			};
		case 'profile/SET_PHOTOS':
			return {
				...state,
				userData: {
					...state.userData,
					photos: action.photos
				} as UserDataType
			}
		default:
			return state;
	}
};

//ACTIONS TYPES
//
type ProfileActionsTypes = InferActionsTypes<typeof actions>

//ACTIONS
export const actions = {
	setUserData: (userData:UserDataType) => ({
		type: 'profile/SET_USER',
		userData,
	}as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'profile/TOGGLE_LOADING',
		isLoading,
	}as const),
	setUserStatus: (status:string|null) => ({
		type: 'profile/SET_STATUS',
		status,
	}as const),
	setUserPhotos: (photos:PhotosType ) => ({
		type: 'profile/SET_PHOTOS',
		photos,
	}as const)
}

//THUNKS
//

type ThunkType = BaseThunkType<ProfileActionsTypes>

export const getUserProfile = (userId:number|null, isAuth:boolean):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		if (!isAuth) {
			dispatch(actions.toggleLoading(false));
			return;
		}

		let data = await profileAPI.getProfile(userId);
		dispatch(actions.setUserData(data));
		dispatch(actions.toggleLoading(false));
	};
};

export const getUserStatus = (userId: number|null):ThunkType => {
	return async (dispatch) => {
		let data = await profileAPI.getStatus(userId);
		dispatch(actions.setUserStatus(data));
	};
};

export const updateUserStatus = (status: string|null  ):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));
		let data = await profileAPI.setStatus(status);
		if (data.resultCode === 0) {
			dispatch(actions.setUserStatus(status));
		}
		dispatch(actions.toggleLoading(false));
	};
};


export const updateUserPhoto = (photo:File):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));
		let data = await profileAPI.setAvatar(photo);
		if (data.resultCode === 0) {
			dispatch(actions.setUserPhotos(data.data.photos));
		}
		dispatch(actions.toggleLoading(false));
	};
};

export const updateUserData = (userData:UserDataType):ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleLoading(true));
		let data = await profileAPI.setUserData(userData)
		if (data.resultCode === 0) {
			let userId = getState().profilePage.userData?.userId;
			if (userId === undefined){
				userId = null
			}
			dispatch(getUserProfile( userId, true));
		}
		dispatch(actions.toggleLoading(false));
	};
};

export default profileReducer;
