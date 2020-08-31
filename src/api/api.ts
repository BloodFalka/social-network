import axios from 'axios'


//AXIOS INSTANCE//
export const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '55d9ee08-b9fc-4b1f-b311-0738f1eff444',
	},
})

//GENERAL TYPES//
//*************//

//RESULT CODES TYPES//
export enum ResultCodesEnum {
	Succes = 0,
	Error = 1
}

export enum ResultCodeEnumWithCaptcha {
	CaptchaIsRequired = 10
}

//RESPONSE DEFAULT TYPE//
export type APIResponseType<D={}, RC=ResultCodesEnum> = {
	resultCode: ResultCodesEnum|RC
	messages: Array<string>,
	data: D
}







