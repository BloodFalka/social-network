import { getAuthUserData } from './auth-reducer'
import { InferActionsTypes, BaseThunkType } from '../store'

type initialStateTypes = {
	initialized: boolean,
}

let initialState: initialStateTypes = {
	initialized: false,
}

const appReducer = (state = initialState, action: AppActionsTypes): initialStateTypes => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
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
	}as const)
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
