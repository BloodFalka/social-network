import { securityAPI } from './../../api/securityAPI';
import { ResultCodesEnum, ResultCodeEnumWithCaptcha } from '../../api/api';
import { authAPI } from "../../api/authAPI";
import { LoginDataFormValuesType } from '../../types/types';
import { InferActionsTypes, BaseThunkType } from '../store';
import { stopSubmit, FormAction } from 'redux-form';

type initialStateType = typeof initialState

type userDataTypes = {
	userId: null|number
	email: null|string
	login: null|string
}

let initialState = {
	data: { userId: null as number|null, email: null as string|null, login: null as string|null },
	isAuth: false,
	isLoading: false,
	isShowingCaptcha: false,
	captchaImg: null as string|null, //null => captcha is no required
};

const authReducer = (state = initialState, action:AuthActionsTypes): initialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state,
				data: { ...action.data },
				isAuth: action.isAuth,
			};
		case 'auth/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		case 'auth/TOGGLE_CAPTCHA':
			return {
				...state,
				isShowingCaptcha: action.isShowingCaptcha,
			};
		case 'auth/SET_CAPTCHA':
			return {
				...state,
				captchaImg: action.captchaImage,
			};
		default:
			return state;
	}
};

//ACTIONS
type AuthActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
	setAuthUserData: (userId: number|null, email: string|null, login: string|null, isAuth: boolean) => ({
		type: 'auth/SET_USER_DATA',
		data: { userId, email, login },
		isAuth,
	}as const),
	toggleLoading: (isLoading: boolean) => ({
		type: 'auth/TOGGLE_LOADING',
		isLoading,
	}as const),
	toggleCaptcha: (isShowingCaptcha: boolean) => ({
		type: 'auth/TOGGLE_CAPTCHA',
		isShowingCaptcha,
	}as const),
	setCaptcha: (captchaImage: string|null) => ({
		type: 'auth/SET_CAPTCHA',
		captchaImage,
	}as const),
}

//THUNKS
type ThunkType = BaseThunkType<AuthActionsTypes | FormAction>


export const getAuthUserData = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		let data = await authAPI.getMe();
		if (data.resultCode === ResultCodesEnum.Succes) {
			const { id, email, login } = data.data;
			dispatch(actions.setAuthUserData(id, email, login, true));
		}
		dispatch(actions.toggleLoading(false));
	};
};


export const authLogin = (userLoginData:LoginDataFormValuesType):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));
		const data = await authAPI.login(userLoginData);
		const error = data.messages[0]&&{error: data.messages[0]}

		switch (data.resultCode) {
			case ResultCodesEnum.Succes:
				dispatch(actions.toggleCaptcha(false));
				dispatch(getAuthUserData());
				break;
			case ResultCodesEnum.Error:
				dispatch(stopSubmit('login', error||{}));
				break
			case ResultCodeEnumWithCaptcha.CaptchaIsRequired:
				dispatch(stopSubmit('login', error||{}));
				if(data.messages[0] === 'Incorrect anti-bot symbols') {
					dispatch(actions.toggleCaptcha(true));
					let captcha = await securityAPI.getCaptcha();
					dispatch(actions.setCaptcha(captcha.url));
				}
				break;
			default:
				break;
		}
		dispatch(actions.toggleLoading(false));
	};
};

export const authLogout = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));
		let data = await authAPI.logout();
		if (data.resultCode === ResultCodesEnum.Succes) {
			dispatch(actions.setAuthUserData(null, null, null, false));
			dispatch(actions.toggleLoading(false));
		}
	};
};

export default authReducer;
