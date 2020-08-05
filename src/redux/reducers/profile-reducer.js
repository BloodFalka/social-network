const SET_USER = 'SET_USER',
	TOGGLE_LOADING = 'TOGGLE_LOADING';

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

export default profileReducer;
