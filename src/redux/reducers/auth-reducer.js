import { authAPI } from '../../api';

const SET_USER_DATA = 'SET_USER_DATA',
	TOGGLE_LOADING = 'TOGGLE_LOADING';

let initialState = {
	data: { userId: null, email: '', login: '' },
	isAuth: false,
	isLoading: false,
};

// let userData = {
//     aboutMe: '12.28.1999',
//     contacts: {
//         facebook: 'facebook.com',
//         website: null,
//         vk: 'vk.com/dimych',
//         twitter: 'https://twitter.com/@sdf',
//         instagram: 'instagra.com/sds',
//         youtube: null,
//         github: 'github.com',
//         mainLink: null,
//     },
//     lookingForAJob: true,
//     lookingForAJobDescription: 'You need a make money',
//     fullName: 'BloodFalka',
//     userId: '9609',
//     photos: {
//         large:
//             'https://i.pinimg.com/564x/06/c7/df/06c7df7ec5a9295a21f6c2040992376e.jpg',
//         small: null,
//     },
// };

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				data: { ...action.data },
				isAuth: true,
			};
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};

//ACTIONS

export const setAuthUserData = (userId, email, login) => ({
	type: 'SET_USER_DATA',
	data: { userId, email, login },
});

export const toggleLoading = (isLoading) => ({
	type: TOGGLE_LOADING,
	isLoading,
});

//THUNKS

export const getAuthUserData = () => {
	return (dispatch) => {
		dispatch(toggleLoading(true));

		authAPI.getMe().then((data) => {
			if (data.resultCode === 0) {
				const { id, email, login } = data.data;
				dispatch(toggleLoading(false));
				dispatch(setAuthUserData(id, email, login));
			}
		});
	};
};

export default authReducer;
