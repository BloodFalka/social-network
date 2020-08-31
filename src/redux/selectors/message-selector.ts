import { AppStateType } from '../store'

export const selectMessages = (state: AppStateType) => state.messagePage.messages
export const selectDialogs = (state: AppStateType) => state.messagePage.dialogs
