const FOLLOW = 'FOLLOW',
	UNFOLLOW = 'UNFOLLOW';

let initialState = {
	users: [
		{
			id: 1,
			followed: false,
			fullName: 'Anton',
			location: { city: 'Bila Tserkva', country: 'Ukraine' },
		},
	],
};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.user.id) {
						return { ...user, followed: true };
					}
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.user.id) {
						return { ...user, followed: false };
					}
				}),
			};
		case SET_USERS:
			return { ...state, users: [...state.users, ...action.users] };
		default:
			return state;
	}
};

export const followUserAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowUserAC = (userId) => ({ type: UNFOLLOW, userId });

export default messageReducer;
