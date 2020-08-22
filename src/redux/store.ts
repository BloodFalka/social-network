import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import friendsReducer from './reducers/friends-reducer'
import postsReducer from './reducers/posts-reducer'
import messageReducer from './reducers/message-reducer'
import profileReducer from './reducers/profile-reducer'
import usersReducer from './reducers/users-reducer'
import authReducer from './reducers/auth-reducer'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import appReducer from './reducers/app-reducer'

let rootReducer = combineReducers({
	friendsPage: friendsReducer,
	postsPage: postsReducer,
	messagePage: messageReducer,
	profilePage: profileReducer,
	searchPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
)

//@ts-ignore
window.__store__ = store

export default store
