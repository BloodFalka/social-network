import { profileAPI } from './../../api/profileAPI';
import { messagesAPI } from './../../api/messagesAPI';
import { MessagesType } from "../../types/types";
import { InferActionsTypes, BaseThunkType } from "../store";

let initialState = {
	messages: [] as Array<MessagesType>,
	isLoading: false,
	messageFriendAvatar: null as string|null,
	currentUserAvatar: null as string|null
};

type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action:MessageActionsTypes): initialStateType => {
	switch (action.type) {
		case 'messages/SET_MESSAGES':
			return {
				...state,
				messages: [...action.messages],
			}
		case 'messages/SET_MESSAGE_FRIEND_AVATAR':
			return{
				...state,
				messageFriendAvatar: action.avatar
			}
		case 'messages/SET_CURRENT_USER_AVATAR':
			return{
				...state,
				currentUserAvatar: action.avatar
			}
		case 'messages/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};

type MessageActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	setMessages: (messages:Array<MessagesType>) => ({ type: 'messages/SET_MESSAGES', messages }as const),
	setMessageFriendAvatar: (avatar: string|null) => ({type: 'messages/SET_MESSAGE_FRIEND_AVATAR', avatar} as const),
	setCurrentUserAvatar: (avatar: string|null) => ({type: 'messages/SET_CURRENT_USER_AVATAR', avatar} as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'messages/TOGGLE_LOADING',
		isLoading,
	}as const),
}

//THUNKS
export type ThunkType = BaseThunkType<MessageActionsTypes>

export const getCurrentUserAvatar = ():ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleLoading(true));
		const currentUserId = getState().auth.data.userId

		const data = await profileAPI.getProfile(currentUserId);

		dispatch(actions.setCurrentUserAvatar(data.photos.small))
		dispatch(actions.toggleLoading(false));
	};
};

export const getMessages = (userId:number|null):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true))

		let data = await messagesAPI.messages.getMessages(userId)
		dispatch(actions.setMessages(data.items))

		dispatch(actions.toggleLoading(false))
	}
}

export const sendMessage = (userId:number, body: string):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true))

		let data = await messagesAPI.messages.sendMessage(userId, body)
		console.log(data)

		dispatch(actions.toggleLoading(false))
	}
}

export default messagesReducer;
