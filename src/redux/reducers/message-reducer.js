const ADD_MESSAGE = 'message/ADD_MESSAGE';

let initialState = {
	dialogs: [
		{
			id: 1,
			name: 'Anton Ivanchuk Volodymirovich',
			avatar:
				'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
		},
		{
			id: 2,
			name: 'Luda',
		},
		{
			id: 3,
			name: 'Nazar',
			avatar:
				'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
		},
		{
			id: 4,
			name: 'Evans',
		},
		{
			id: 5,
			name: 'Vitalii Kovalev',
		},
		{
			id: 6,
			name: 'Telepen',
		},
		{
			id: 7,
			name: 'Typii',
		},
		{
			id: 8,
			name: 'Tygiy',
		},
	],
	messages: [
		{
			id: 1,
			message: '25 grn plz beatch',
			avatar:
				'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
			likesCount: 0,
		},
		{
			id: 2,
			message: 'No, you are Batman, beatch',
			avatar:
				'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
			likesCount: 0,
			myMessage: true,
		},
	],
	userAvatar:
		'https://i.pinimg.com/564x/06/c7/df/06c7df7ec5a9295a21f6c2040992376e.jpg',
};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: state.messages.length + 1,
				message: action.text,
				avatar: state.userAvatar,
				likesCount: 0,
			};

			return {
				...state,
				messages: [...state.messages, newMessage],
			};
		default:
			return state;
	}
};

export const addMessage = (text) => ({ type: ADD_MESSAGE, text });

export default messageReducer;
