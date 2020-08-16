import { getAuthUserData } from './auth-reducer'

type initialStateTypes = {
	initialized: boolean,
}

type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS,
}

type appActionsTypes = initializedSuccessActionType

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState: initialStateTypes = {
	initialized: false,
}

const appReducer = (state = initialState, action: appActionsTypes): initialStateTypes => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

//ACTIONS

export const initializedSuccess = (): initializedSuccessActionType => ({
	type: INITIALIZED_SUCCESS,
})

//THUNKS

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData())

	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess())
	})
}

export default appReducer
