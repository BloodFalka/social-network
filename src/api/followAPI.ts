import { axiosInstance, APIResponseType } from './api'

//FOLLOW-API
//
export const followAPI = {
	setFollow(userId: number) {
		return axiosInstance.post<APIResponseType>(`follow/${userId}`, {}).then((response) => response.data)
	},

	setUnfollow(userId: number) {
		return axiosInstance.delete<APIResponseType>(`follow/${userId}`).then((response) => response.data)
	},

	getIsMeFollow(userId: number | null) {
		return axiosInstance.get<boolean>(`follow/${userId}`, {}).then((response) => response.data)
	},
}
