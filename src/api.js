import * as axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	SameSite: 'none',
	headers: {
		'API-KEY': '60254051-afb4-4894-9ea2-24f35818e6b1',
	},
});

export const usersAPI = {
	getUsers(totalUsersCount, pageSize, currentPage, page = false) {
		const pagesCount = totalUsersCount / pageSize;
		const prevPage =
			currentPage - 1 < 1 ? Math.ceil(pagesCount) : currentPage - 1;
		const nextPage =
			currentPage + 1 > Math.ceil(pagesCount) ? 1 : currentPage + 1;

		const showPage =
			page === 'prev' ? prevPage : page === 'next' ? nextPage : currentPage;

		return axiosInstance
			.get(`users?page=${showPage}&count=${pageSize}`)
			.then((response) => response.data);
	},
};

export const profileAPI = {
	getProfile(userId) {
		return axiosInstance
			.get(`profile/${userId}`)
			.then((response) => response.data);
	},
	setStatus(status) {
		return axiosInstance
			.put(`profile/status`, { status: status })
			.then((response) => response.data);
	},
};

export const followAPI = {
	setFollow(id) {
		return axiosInstance
			.post(`follow/${id}`, {})
			.then((response) => response.data);
	},

	setUnfollow(id) {
		return axiosInstance
			.delete(`follow/${id}`)
			.then((response) => response.data);
	},
};

export const authAPI = {
	getMe() {
		return axiosInstance.get(`auth/me`).then((response) => response.data);
	},
};
