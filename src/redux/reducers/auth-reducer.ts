import { authAPI } from '../../api';
import { stopSubmit } from 'redux-form';

type initialStateType = typeof initialState

type userDataTypes = {
	userId: null|number
	email: null|string
	login: null|string
}
type setAuthUserDataTypes = {
	type: typeof SET_USER_DATA
	data: userDataTypes
	isAuth: boolean
}

type toggleLoadingTypes = {
	type: typeof TOGGLE_LOADING
	isLoading: boolean
}


type toggleCaptchaTypes = {
	type: typeof TOGGLE_CAPTCHA
	isShowingCaptcha: boolean
}

type setCaptchaTypes = {
	type: typeof SET_CAPTCHA
	captchaImage: null|string
}

type authActionsTypes = setAuthUserDataTypes|toggleLoadingTypes|toggleCaptchaTypes|setCaptchaTypes;

const SET_USER_DATA = 'auth/SET_USER_DATA',
	TOGGLE_LOADING = 'auth/TOGGLE_LOADING',
	TOGGLE_CAPTCHA = 'auth/TOGGLE_CAPTCHA',
	SET_CAPTCHA = 'auth/SET_CAPTCHA';

let initialState = {
	data: { userId: null as number|null, email: null as string|null, login: null as string|null },
	isAuth: false,
	isLoading: false,
	isShowingCaptcha: false,
	captcha: null as string|null, //null => captcha is no required
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


const authReducer = (state = initialState, action:authActionsTypes): initialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				data: { ...action.data },
				isAuth: action.isAuth,
			};
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case TOGGLE_CAPTCHA:
			return {
				...state,
				isShowingCaptcha: action.isShowingCaptcha,
			};
		case SET_CAPTCHA:
			return {
				...state,
				captcha: action.captchaImage,
			};
		default:
			return state;
	}
};

//ACTIONS

export const setAuthUserData = (userId: number|null, email: string|null, login: string|null, isAuth: boolean): setAuthUserDataTypes => ({
	type: SET_USER_DATA,
	data: { userId, email, login },
	isAuth,
});

export const toggleLoading = (isLoading: boolean): toggleLoadingTypes => ({
	type: TOGGLE_LOADING,
	isLoading,
});

export const toggleCaptcha = (isShowingCaptcha: boolean) => ({
	type: TOGGLE_CAPTCHA,
	isShowingCaptcha,
});

export const setCaptcha = (captchaImage: string|null) => ({
	type: SET_CAPTCHA,
	captchaImage,
});

//THUNKS

export const getAuthUserData = () => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));

		let data = await authAPI.getMe();
		if (data.resultCode === 0) {
			const { id, email, login } = data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
		dispatch(toggleLoading(false));
	};
};

type loginData = {
	email: string
	password: string
	rememberMe: boolean
}

export const authLogin = (userLoginData:loginData) => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));
		let data = await authAPI.login(userLoginData);
		debugger
		switch (data.resultCode) {
			case 0:
				dispatch(toggleCaptcha(false));
				dispatch(getAuthUserData());
				break;
			case 1:
				dispatch(
					stopSubmit('login', {
						error: 'Email or password is wrong',
					})
				);
				break;
			case 10:
				dispatch(toggleCaptcha(true));
				let response = await authAPI.getCaptcha();
				dispatch(setCaptcha(response));
				break;
			default:
				break;
		}
		dispatch(toggleLoading(false));
	};
};

export const authLogout = () => {
	return async (dispatch:any) => {
		dispatch(toggleLoading(true));
		let data = await authAPI.logout();
		if (data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
			dispatch(toggleLoading(false));
		}
	};
};

export default authReducer;
