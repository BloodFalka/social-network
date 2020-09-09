import usersReducer, { InitialStateType, actions } from './users-reducer'

let state: InitialStateType

beforeEach(() => {
	state = {
		users: [
			{ id: 0, name: 'Anton0', status: '0', followed: false, photos: { small: null, large: null } },
			{ id: 1, name: 'Anton1', status: '1', followed: false, photos: { small: null, large: null } },
			{ id: 2, name: 'Anton2', status: '2', followed: true, photos: { small: null, large: null } },
			{ id: 3, name: 'Anton3', status: '3', followed: true, photos: { small: null, large: null } },
		],
		pageSize: 6,
		totalUsersCount: 0,
		currentPage: 1,
		FollowingProgress: [],
		isLoading: false,
		isError: false,
		searchTerm: '',
	}
})

test('follow success', () => {
	const newState = usersReducer(state, actions.follow(1))
	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
	const newState = usersReducer(state, actions.unfollow(3))

	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeFalsy()
})
