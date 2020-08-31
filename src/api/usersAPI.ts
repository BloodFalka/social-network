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
	getUsers(page: number, pageSize: number, term: string, friend?: boolean) {
		// const cheatTerm = term === '/friend'||'/stranger'? '': term
		// const cheatFriend = term === '/friend'? true:'/stranger'? false: friend
		return axiosInstance
			.get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}&term=${term}&friend=${friend}`)
			.then((response) => response.data)
	},
}
