import { AppStateType } from '../store'

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectUserId = (state: AppStateType) => state.auth.data.userId
export const selectIsLoading = (state: AppStateType) => state.auth.isLoading
export const selectIsShowingCaptcha = (state: AppStateType) => state.auth.isShowingCaptcha
export const selectCaptcha = (state: AppStateType) => state.auth.captchaImg
