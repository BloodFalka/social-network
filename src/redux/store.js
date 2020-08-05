import { createStore, combineReducers, applyMiddleware } from 'redux';
import friendsReducer from './reducers/friends-reducer';
import newPostReducer from './reducers/new-post-reducer';
import messageReducer from './reducers/message-reducer';
import profileReducer from './reducers/profile-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
	friendsPage: friendsReducer,
	newPostPage: newPostReducer,
	messagePage: messageReducer,
	profilePage: profileReducer,
	searchPage: usersReducer,
	auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
