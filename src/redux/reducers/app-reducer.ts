import { getAuthUserData } from './auth-reducer'
import { InferActionsTypes, BaseThunkType } from '../store'

let initialState = {
	initialized: false,
	searchTerm: ''
}

type initialStateTypes = typeof initialState

const appReducer = (state = initialState, action: AppActionsTypes): initialStateTypes => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}
		case 'app/UPDATE_TERM':
			return{
				...state,
				searchTerm: action.term
			}
		default:
			return state
	}
}

//ACTIONS
type AppActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	initializedSuccess: () => ({
		type: 'app/INITIALIZED_SUCCESS',
	}as const),
	updateTerm: (term:string) => ({ type: 'app/UPDATE_TERM', term }as const),
}

//THUNKS
type ThunkType = BaseThunkType<AppActionsTypes, void>

export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(getAuthUserData())

	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer
