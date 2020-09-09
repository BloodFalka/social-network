import { MessagesType } from './../types/types'
import { axiosInstance, APIResponseType } from './api'
import { DialogsType } from '../types/types'

type GetMessagesResponseType = {
	error: null|number
	items: Array<MessagesType>
	totalCount: number
}

type SendMessageResponseType = {
	message:{
		id:string,
		body:string,
		translatedBody:null,
		addedAt:string,
		senderId:number,
		senderName:string,
		recipientId:number,
		recipientName:string,
		viewed:boolean,
		deletedBySender:boolean,
		deletedByRecipient:false,
		isSpam:false,
		distributionId:null
	}
}
//MESSAGES-API
//
export const messagesAPI = {
	dialogs: {
		startDialog(userId: number | null) {
			return axiosInstance.put<APIResponseType>(`dialogs/${userId}`, {}).then((response) => response.data)
		},

		getDialogs() {
			return axiosInstance.get<Array<DialogsType>>(`dialogs`, {}).then((response) => response.data)
		},
	},

	messages: {
		getMessages(userId: number | null) {
			return axiosInstance
				.get<GetMessagesResponseType>(`dialogs/${userId}/messages`, {})
				.then((response) => response.data)
		},

		sendMessage(userId: number, body: string) {
			return axiosInstance
				.post<APIResponseType<SendMessageResponseType>>(`dialogs/${userId}/messages`, { body })
				.then((response) => response.data)
		},

		isMyMessageViewed(messageId: number) {
			return axiosInstance
				.get<APIResponseType>(`dialogs/messages/${messageId}/viewed`, {})
				.then((response) => response.data)
		},
	},
}
