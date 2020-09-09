import { AppStateType } from '../store'

export const selectMessages = (state: AppStateType) => state.messages.messages
export const selectIsLoading = (state: AppStateType) => state.messages.isLoading
export const selectMessageFriendAvatar = (state: AppStateType) => state.messages.messageFriendAvatar
export const selectCurrentUserAvatar = (state: AppStateType) => state.messages.currentUserAvatar
