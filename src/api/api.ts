import axios from 'axios'


//AXIOS INSTANCE//
export const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		//BloodFalka
		'API-KEY': '48a575df-4041-4c8c-add8-537c1451625b',
		//Fallka
		//'API-KEY': '78567aa2-7995-43ae-a987-8e1d3c868592',
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







