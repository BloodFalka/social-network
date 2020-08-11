import { usersAPI, followAPI } from '../../api';
import { updateObjectInArray } from '../../utils/objects-helpers';

const FOLLOW = 'users/FOLLOW',
	UNFOLLOW = 'users/UNFOLLOW',
	SET_USERS = 'users/SET_USERS',
	SET_PREVIOUS_PAGE = 'users/SET_PREVIOUS_PAGE',
	SET_NEXT_PAGE = 'users/SET_NEXT_PAGE',
	SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
	TOGGLE_LOADING = 'users/TOGGLE_LOADING',
	TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
	TOGGLE_ERROR = 'users/TOGGLE_LOADING';

let initialState = {
	users: [],
	pageSize: 6,
	totalUsersCount: 0,
	currentPage: 1,
	isLoading: false,
	isFollowingProgress: [],
	isError: false,
	// props.setUsers([
	// 	{
	// 		id: 1,
	// 		photos: {
	// 			large:
	// 				'https://64.media.tumblr.com/5cae652ef56373d4f5b09afa9788efcd/09068c1415f59536-e9/s400x600/4690a0dabb98a7be7795a3b68f863d6dff6a5a2f.jpg',
	// 			small: null,
	// 		},
	// 		followed: false,
	// 		fullName: 'Anton',
	// 		status: 'Bila Tserkva, Ukraine' },
	// 	},
	// 	{
	// 		id: 2,
	// 		photos: {
	// 			large:
	// 				'https://64.media.tumblr.com/43cb3625ef9d86aa8e8962fafcb76fa1/1cc861a060c3d154-af/s540x810/1ba9bfc4d4eab11cf84d25b83f82e45c3c7c35f6.jpg',
	// 			small: null,
	// 		},
	// 		followed: false,
	// 		fullName: 'Leo',
	// 		status: 'Kyev, Ukraine' },
	// 	},
	// 	{
	// 		id: 3,
	// 		photos: {
	// 			large:
	// 				'https://64.media.tumblr.com/f6430befd64063480c18ef0b6288d846/c89cf36637095e47-45/s400x600/325c1fa3305cb307e68e52b59d72cf4bb1c39703.png',
	// 			small: null,
	// 		},
	// 		followed: false,
	// 		fullName: 'Benedict',
	// 		status: 'London, UK'
	// 	},
	// 	{
	// 		id: 4,
	// 		photos: {
	// 			large:
	// 				'https://64.media.tumblr.com/3e90f4932108a241924f894884912ad7/91e46c90bd7a8b27-01/s400x600/4abe7e03795c8802ebe6dc6e526d1150166fec21.jpg',
	// 			small: null,
	// 		},
	// 		followed: false,
	// 		fullName: 'Shrek',
	// 		status: 'Swamp', Far far away'
	// 	},
	// 	{
	// 		id: 5,
	// 		photos: {
	// 			large:
	// 				'https://64.media.tumblr.com/4db4e8e751a1fd4c15c9fc8adbfcafd0/204eac1c2a6dd7ee-2c/s400x600/cdd38c97c8772f71a0197d288eb4ab21ca26f073.png',
	// 			small: null,
	// 		},
	// 		followed: true,
	// 		fullName: 'Geralt',
	// 		status: 'Corvo Bianco, Tussent',
	// 	},
	// 	{
	// 		id: 6,
	// 		avatar: {
	// 			large:
	// 				'http://img10.joyreactor.cc/pics/post/gachimuchi-van-darkholme-Dungeon-Master-performance-artist-5090424.jpeg',
	// 			small: null,
	// 		},
	// 		followed: true,
	// 		fullName: 'Van Darkholm',
	// 		status: 'LA', Japan',
	// 	},
	// ]);
};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			};
		case SET_USERS:
			return {
				...state,
				users: [...action.users],
			};
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.count,
			};
		case SET_NEXT_PAGE:
			return {
				...state,
				currentPage:
					state.currentPage + 1 >
					Math.ceil(state.totalUsersCount / state.pageSize)
						? 1
						: state.currentPage + 1,
			};
		case SET_PREVIOUS_PAGE:
			return {
				...state,
				currentPage:
					state.currentPage - 1 < 1
						? Math.ceil(state.totalUsersCount / state.pageSize)
						: state.currentPage - 1,
			};
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				isFollowingProgress: action.isFollowingProgress
					? [...state.isFollowingProgress, action.userId]
					: state.isFollowingProgress.filter((id) => id !== action.userId),
			};
		case TOGGLE_ERROR:
			return {
				...state,
				isError: action.isError,
			};
		default:
			return state;
	}
};

//ACTIONS

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotalUsersCount = (count) => ({
	type: SET_TOTAL_USERS_COUNT,
	count,
});
export const setNextPage = () => ({
	type: SET_NEXT_PAGE,
});
export const setPreviousPage = () => ({
	type: SET_PREVIOUS_PAGE,
});
export const toggleLoading = (isLoading) => ({
	type: TOGGLE_LOADING,
	isLoading,
});
export const toggleFollowingProgress = (isFollowingProgress, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFollowingProgress,
	userId,
});
export const toggleError = (isError) => ({
	type: TOGGLE_ERROR,
	isError,
});

//THUNKS

export const requestUsers = (
	totalUsersCount,
	pageSize,
	currentPage,
	page = false
) => {
	return async (dispatch) => {
		dispatch(toggleLoading(true));
		let data = await usersAPI.requestUsers(
			totalUsersCount,
			pageSize,
			currentPage,
			page
		);

		dispatch(toggleLoading(false));
		page === 'prev' && dispatch(setPreviousPage());
		page === 'next' && dispatch(setNextPage());

		dispatch(setUsers(data.items));

		dispatch(setTotalUsersCount(data.totalCount));
	};
};

const followUnfollowFlow = async (
	dispatch,
	userId,
	apiMethod,
	actionCreator
) => {
	dispatch(toggleFollowingProgress(true, userId));

	let data = await apiMethod(userId);
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	} else {
		this.props.toggleError(true);
	}
	dispatch(toggleFollowingProgress(false, userId));
};

export const setFollow = (userId) => {
	return async (dispatch) => {
		followUnfollowFlow(
			dispatch,
			userId,
			followAPI.setFollow.bind(followAPI),
			follow
		);
	};
};

export const setUnfollow = (userId) => {
	return async (dispatch) => {
		followUnfollowFlow(
			dispatch,
			userId,
			followAPI.setUnfollow.bind(followAPI),
			unfollow
		);
	};
};

export default messageReducer;
