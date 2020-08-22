import { AppStateType } from '../store'

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectUserId = (state: AppStateType) => state.auth.data.userId
