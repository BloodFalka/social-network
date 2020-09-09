import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux'
import friendsReducer from './reducers/friends-reducer'
import postsReducer from './reducers/posts-reducer'
import messagesReducer from './reducers/messages-reducer'
import dialogsReducer from './reducers/dialogs-reducer'
import profileReducer from './reducers/profile-reducer'
import usersReducer from './reducers/users-reducer'
import authReducer from './reducers/auth-reducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import appReducer from './reducers/app-reducer'
import pixelPhotosReducer from './reducers/pexelPhotos-reducer'

let rootReducer = combineReducers({
	friendsPage: friendsReducer,
	postsPage: postsReducer,
	messages: messagesReducer,
	dialogs: dialogsReducer,
	profilePage: profileReducer,
	usersPage: usersReducer,
	pixelPhotosPage: pixelPhotosReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type BaseThunkType<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
)

//@ts-ignore
window.__store__ = store

export default store
