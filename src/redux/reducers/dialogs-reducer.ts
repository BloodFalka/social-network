import { messagesAPI } from '../../api/messagesAPI';
import { DialogsType } from "../../types/types";
import { InferActionsTypes, BaseThunkType } from "../store";

let initialState = {
	dialogs: [] as Array<DialogsType>,
	isLoading: false,
};

type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:MessageActionsTypes): initialStateType => {
	switch (action.type) {
		case 'dialogs/SET_DIALOGS':
			return {
				...state,
				dialogs: [...action.dialogs],
			}
		case 'dialogs/TOGGLE_LOADING':
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
	setDialogs: (dialogs:Array<DialogsType>) => ({ type: 'dialogs/SET_DIALOGS', dialogs }as const),
	toggleLoading: (isLoading:boolean) => ({
		type: 'dialogs/TOGGLE_LOADING',
		isLoading,
	}as const),
}

//THUNKS
export type ThunkType = BaseThunkType<MessageActionsTypes>


export const sendMessage = (userId:number, body: string):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true))

		let data = await messagesAPI.messages.sendMessage(userId, body)
		console.log(data)

		dispatch(actions.toggleLoading(false))
	}
}

export const startDialog = (userId: number | null): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		await messagesAPI.dialogs.startDialog(userId);
		console.log(`Start Chatting with user with id: ${userId}`);
		dispatch(actions.toggleLoading(false));
	};
};

export const getDialogs = (): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		let data = await messagesAPI.dialogs.getDialogs();
		dispatch(actions.setDialogs(data));

		dispatch(actions.toggleLoading(false));
	};
};

export default dialogsReducer;
