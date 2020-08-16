import * as axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '55d9ee08-b9fc-4b1f-b311-0738f1eff444',
	},
})

export const usersAPI = {
	requestUsers(totalUsersCount, pageSize, currentPage, page = false, term) {
		const pagesCount = totalUsersCount / pageSize
		const prevPage = currentPage - 1 < 1 ? Math.ceil(pagesCount) : currentPage - 1
		const nextPage = currentPage + 1 > Math.ceil(pagesCount) ? 1 : currentPage + 1

		const showPage = page === 'prev' ? prevPage : page === 'next' ? nextPage : currentPage

		return axiosInstance.get(`users?page=${showPage}&count=${pageSize}&term=${term}`).then((response) => response.data)
	},
}

export const profileAPI = {
	getProfile(userId) {
		return axiosInstance.get(`profile/${userId}`).then((response) => response.data)
	},
	getStatus(userId) {
		return axiosInstance.get(`profile/status/${userId}`).then((response) => response.data)
	},
	setStatus(status) {
		return axiosInstance.put(`profile/status`, { status: status }).then((response) => response.data)
	},
	setAvatar(avatar) {
		let formData = new FormData()
		formData.append('image', avatar)
		return axiosInstance
			.put(`profile/photo`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => response.data)
	},
	setUserData(userData) {
		debugger
		return axiosInstance.put('/profile', { ...userData }).then((response) => response.data)
	},
}

export const followAPI = {
	setFollow(id) {
		return axiosInstance.post(`follow/${id}`, {}).then((response) => response.data)
	},

	setUnfollow(id) {
		return axiosInstance.delete(`follow/${id}`).then((response) => response.data)
	},
}

export const authAPI = {
	getMe() {
		return axiosInstance.get(`auth/me`).then((response) => response.data)
	},
	getCaptcha() {
		return axiosInstance.get(`security/get-captcha-url`).then((response) => response.data.url)
	},
	login(userLoginData) {
		return axiosInstance
			.post(`auth/login`, {
				email: userLoginData.email,
				password: userLoginData.password,
				rememberMe: userLoginData.rememberMe,
				captcha: userLoginData.captcha,
			})
			.then((response) => response.data)
	},
	logout() {
		return axiosInstance.delete('auth/login').then((response) => response.data)
	},
}
