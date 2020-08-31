import { LoginDataFormValuesType } from '../types/types';
import { axiosInstance, ResultCodeEnumWithCaptcha, APIResponseType} from './api';

//AUTH-API//
//*******//

//AUTH-API TYPES
//
type MeResponseDataType = {
	id: number
	email: string
	login: string
}

type LoginResponseType = {
	userId: number
}

//AUTH-API
//
export const authAPI = {
	getMe() {
		return axiosInstance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then((response) => response.data);
	},
	login(userLoginData: LoginDataFormValuesType) {
		return axiosInstance
			.post<APIResponseType<LoginResponseType, ResultCodeEnumWithCaptcha>>(`auth/login`, {
				email: userLoginData.email,
				password: userLoginData.password,
				rememberMe: userLoginData.rememberMe,
				captcha: userLoginData.captcha,
			})
			.then((response) => response.data);
	},
	logout() {
		return axiosInstance.delete<APIResponseType>('auth/login').then((response) => response.data);
	},
};


