import { axiosInstance } from './api'

export const securityAPI = {
	getCaptcha() {
		return axiosInstance.get<{ url: string }>(`security/get-captcha-url`).then((response) => response.data)
	},
}
