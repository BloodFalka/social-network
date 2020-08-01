import { createStore, combineReducers } from 'redux';
import friendsReducer from './reducers/friends-reducer';
import messageReducer from './reducers/message-reducer';
import profileReducer from './reducers/profile-reducer';

let reducers = combineReducers({
	friendsPage: friendsReducer,
	messagePage: messageReducer,
	profilePage: profileReducer,
});

let store = createStore(reducers);

export default store;
