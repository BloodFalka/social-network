import { axiosInstance } from './api'
import { UserType } from '../types/types'
//USERS-API
//
type GetUsersResponseType = {
	items: Array<UserType>,
	totalCount: number,
	error: string | null,
}

export const usersAPI = {
	getUsers(pageSize: number, currentPage: number, term: string, friend?: boolean) {
		const termQuery = term ? `&term=${term}` : ''
		const friendQuery = friend ? `&friend=${friend}` : ''
		// const cheatTerm = term === '/friend'||'/stranger'? '': term
		// const cheatFriend = term === '/friend'? true:'/stranger'? false: friend
		return axiosInstance
			.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}${termQuery}${friendQuery}`)
			.then((response) => response.data)
	},
}
