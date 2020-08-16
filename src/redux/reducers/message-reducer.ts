const ADD_MESSAGE = 'message/ADD_MESSAGE';

type dialogsType = {
	id: number
	name: string
	avatar: string|null
}

type messagesType = {
	id: number
	message: string
	avatar: string|null
	likesCount: number
}

type initialStateType = {
	dialogs: Array<dialogsType>
	messages: Array<messagesType>
	userAvatar: string|null
}

let initialState: initialStateType = {
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
			avatar:null
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
			avatar:null
		},
		{
			id: 5,
			name: 'Vitalii Kovalev',
			avatar:null
		},
		{
			id: 6,
			name: 'Telepen',
			avatar:null
		},
		{
			id: 7,
			name: 'Typii',
			avatar:null
		},
		{
			id: 8,
			name: 'Tygiy',
			avatar:null
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
		},
	],
	userAvatar:
		'https://i.pinimg.com/564x/06/c7/df/06c7df7ec5a9295a21f6c2040992376e.jpg',
};

type messageActionsTypes = addMessageActionTypes

const messageReducer = (state = initialState, action:messageActionsTypes): initialStateType => {
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

type addMessageActionTypes = {type: typeof ADD_MESSAGE, text: string}

export const addMessage = (text: string):addMessageActionTypes => ({ type: ADD_MESSAGE, text });

export default messageReducer;
