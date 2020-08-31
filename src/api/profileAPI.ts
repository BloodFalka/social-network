import { UserDataType, PhotosType } from '../types/types'
import { axiosInstance, APIResponseType } from './api'

//PROFILE-API TYPES
//
type SetAvatarResponseType = {
	photos: PhotosType,
}

//PROFILE-API
//

export const profileAPI = {
	getProfile(userId: number | null) {
		return axiosInstance.get<UserDataType>(`profile/${userId}`).then((response) => response.data)
	},
	getStatus(userId: number | null) {
		return axiosInstance.get<string>(`profile/status/${userId}`).then((response) => response.data)
	},
	setStatus(status: string | null) {
		return axiosInstance
			.put<APIResponseType>(`profile/status`, { status: status })
			.then((response) => response.data)
	},
	setAvatar(avatar: File) {
		const formData = new FormData()
		formData.append('image', avatar)
		return axiosInstance
			.put<APIResponseType<SetAvatarResponseType>>(`profile/photo`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => response.data)
	},
	setUserData(userData: UserDataType) {
		return axiosInstance
			.put<APIResponseType>('/profile', { ...userData })
			.then((response) => response.data)
	},
}
