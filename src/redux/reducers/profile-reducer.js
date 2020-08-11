import { profileAPI } from '../../api';

const SET_USER = 'profile/SET_USER',
	TOGGLE_LOADING = 'profile/TOGGLE_LOADING',
	SET_STATUS = 'profile/SET_STATUS',
	SET_PHOTOS = 'profile/SET_PHOTOS';

let initialState = {
	userData: null,
	isLoading: false,
};

const profileReducer = (state = initialState, action) => {
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
				userData: { ...state.userData, photos: action.photos },
			};
		default:
			return state;
	}
};

export const setUserData = (userData) => ({
	type: SET_USER,
	userData,
});
export const toggleLoading = (isLoading) => ({
	type: TOGGLE_LOADING,
	isLoading,
});
export const setUserStatus = (status) => ({
	type: SET_STATUS,
	status,
});
export const setUserPhotos = (photos) => ({
	type: SET_PHOTOS,
	photos,
});

export const getUserProfile = (userId, isAuth) => {
	return async (dispatch) => {
		dispatch(toggleLoading(true));

		if (!isAuth) {
			return;
		}

		let data = await profileAPI.getProfile(userId);
		dispatch(toggleLoading(false));
		dispatch(setUserData(data));
	};
};

export const getUserStatus = (userId) => {
	return async (dispatch) => {
		let response = await profileAPI.getStatus(userId);
		dispatch(setUserStatus(response));
	};
};

export const updateUserStatus = (status) => {
	return async (dispatch) => {
		dispatch(toggleLoading(true));
		let response = await profileAPI.setStatus(status);
		if (response.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
		dispatch(toggleLoading(false));
	};
};

export const updateUserPhoto = (photo) => {
	return async (dispatch) => {
		dispatch(toggleLoading(true));
		let response = await profileAPI.setAvatar(photo);
		if (response.resultCode === 0) {
			dispatch(setUserPhotos(response.data.photos));
		}
		dispatch(toggleLoading(false));
	};
};

export const updateUserData = (userData) => {
	return async (dispatch, getState) => {
		dispatch(toggleLoading(true));

		let response = await profileAPI.setUserData(userData);
		if (response.resultCode === 0) {
			dispatch(getUserProfile(getState().profilePage.userData.userId, true));
		}
		dispatch(toggleLoading(false));
	};
};

export default profileReducer;
