import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import friendsReducer from './reducers/friends-reducer';
import newPostReducer from './reducers/new-post-reducer';
import messageReducer from './reducers/message-reducer';
import profileReducer from './reducers/profile-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import appReducer from './reducers/app-reducer';

let reducers = combineReducers({
	friendsPage: friendsReducer,
	newPostPage: newPostReducer,
	messagePage: messageReducer,
	profilePage: profileReducer,
	searchPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.__store__ = store;

export default store;
