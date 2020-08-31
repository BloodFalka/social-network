import { MessagesType, DialogsType } from "../../types/types";
import { InferActionsTypes } from "../store";

type initialStateType = {
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
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
			liked: false
		},
		{
			id: 2,
			message: 'No, you are Batman, beatch',
			avatar:
				'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
			likesCount: 0,
			liked: false
		},
	],
	userAvatar:
		'https://i.pinimg.com/564x/06/c7/df/06c7df7ec5a9295a21f6c2040992376e.jpg',
};

const messageReducer = (state = initialState, action:MessageActionsTypes): initialStateType => {
	switch (action.type) {
		case 'message/ADD_MESSAGE':
			let newMessage:MessagesType = {
				id: action.id,
				message: action.text,
				avatar: state.userAvatar||null,
				likesCount: 0,
				liked: false
			};

			return {
				...state,
				messages: [...state.messages, newMessage],
			};
		default:
			return state;
	}
};

type MessageActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	addMessage: (text: string, id: number|string) => ({ type: 'message/ADD_MESSAGE', text, id }as const)
}

export default messageReducer;
